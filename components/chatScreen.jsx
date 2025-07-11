import React, { useCallback, useEffect, useState, useRef } from "react"
import { GiftedChat } from "react-native-gifted-chat"
import { auth } from "../firebaseConfig"
import { onAuthStateChanged, getIdToken } from "firebase/auth"

export default function ChatScreen({ route }) {
  const { receiverId } = route.params
  const [messages, setMessages] = useState([])
  const ws = useRef(null)
  const userRef = useRef(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        userRef.current = user
        const token = await getIdToken(user, true)

        const chatId = generateChatId(user.uid, receiverId)

        ws.current = new WebSocket(`ws://http://localhost:8000/ws?token=${token}&chatId=${chatId}`)

        ws.current.onopen = () => console.log("WebSocket conectado")

        ws.current.onmessage = (event) => {
          const data = JSON.parse(event.data)
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, {
              _id: data.messageId,
              text: data.text,
              createdAt: new Date(data.timestamp),
              user: { _id: data.from },
            })
          )
        }

        ws.current.onerror = (error) => console.error("WebSocket error:", error)
        ws.current.onclose = () => console.log("WebSocket cerrado")
      }
    })

    return () => {
      unsubscribe()
      ws.current?.close()
    }
  }, [receiverId])

  const onSend = useCallback((messages = []) => {
    const { text } = messages[0]
    const chatId = generateChatId(userRef.current.uid, receiverId)

    ws.current.send(
      JSON.stringify({
        chatId,
        receiverId,
        text,
      })
    )

    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
  }, [receiverId])

  function generateChatId(userId1, userId2) {
    return [userId1, userId2].sort().join("_")
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{ _id: userRef.current?.uid }}
      placeholder="Escribí un mensaje..."
      showUserAvatar
      showAvatarForEveryMessage
    />
  )
}