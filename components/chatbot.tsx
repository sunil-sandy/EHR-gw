"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { MessageCircle, Send, X, Minimize2, Maximize2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your Hospital Management System assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Sample responses for the chatbot
  const botResponses = [
    "I can help you navigate the Hospital Management System. What specific area are you looking for?",
    "You can find patient information in the Patients section of the sidebar.",
    "To schedule an appointment, go to the Appointments section and click on 'Schedule'.",
    "For billing inquiries, please check the Billing section where you can view invoices and payments.",
    "The EMR section contains all electronic medical records including prescriptions and lab results.",
    "Is there anything else I can help you with?",
    "To add a new patient, go to Patients > Add Patient in the sidebar menu.",
    "You can view bed availability in the Inpatient > Bed Allocation section.",
    "Reports and analytics can be found in the Reports section of the sidebar.",
    "For technical support, please contact our IT department at support@hospital.com.",
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newUserMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot response after a delay
    setTimeout(
      () => {
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]
        const newBotMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: randomResponse,
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, newBotMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    ) // Random delay between 1-2 seconds
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (isMinimized) setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "auto" : "500px",
            }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-4"
          >
            <Card className="w-80 md:w-96 shadow-lg border-[#5a67f6]/20">
              <CardHeader className="p-4 border-b bg-[#5a67f6] text-white rounded-t-lg flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-medium">HMS Assistant</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMinimize}
                    className="h-8 w-8 text-white hover:bg-[#4c56d6]"
                  >
                    {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleChat}
                    className="h-8 w-8 text-white hover:bg-[#4c56d6]"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              {!isMinimized && (
                <>
                  <CardContent className="p-4 h-[350px] overflow-y-auto">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div className="flex items-start max-w-[80%]">
                            {message.sender === "bot" && (
                              <Avatar className="h-8 w-8 mr-2 bg-[#5a67f6]">
                                <span className="text-xs font-bold">HMS</span>
                              </Avatar>
                            )}
                            <div
                              className={`rounded-lg p-3 ${
                                message.sender === "user" ? "bg-[#5a67f6] text-white" : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p className="text-xs mt-1 opacity-70">
                                {message.timestamp.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="flex items-start max-w-[80%]">
                            <Avatar className="h-8 w-8 mr-2 bg-[#5a67f6]">
                              <span className="text-xs font-bold">HMS</span>
                            </Avatar>
                            <div className="rounded-lg p-3 bg-gray-100 text-gray-800">
                              <div className="flex space-x-1">
                                <div
                                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                                  style={{ animationDelay: "0ms" }}
                                ></div>
                                <div
                                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                                  style={{ animationDelay: "150ms" }}
                                ></div>
                                <div
                                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                                  style={{ animationDelay: "300ms" }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 border-t">
                    <div className="flex w-full items-center space-x-2">
                      <Input
                        placeholder="Type your message..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} size="icon" className="bg-[#5a67f6] hover:bg-[#4c56d6]">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={toggleChat}
        size="icon"
        className="h-12 w-12 rounded-full bg-[#5a67f6] hover:bg-[#4c56d6] shadow-lg"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  )
}
