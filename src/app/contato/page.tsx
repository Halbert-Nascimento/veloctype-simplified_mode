'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  EnvelopeIcon, 
  ChatBubbleLeftRightIcon, 
  QuestionMarkCircleIcon, 
  BugAntIcon,
  LightBulbIcon,
  HeartIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import PageContainer from '../components/PageContainer'

export default function Contato() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'geral'
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const contactTypes = [
    {
      id: 'geral',
      icon: ChatBubbleLeftRightIcon,
      title: 'Dúvida Geral',
      description: 'Perguntas sobre o funcionamento da plataforma'
    },
    {
      id: 'bug',
      icon: BugAntIcon,
      title: 'Reportar Bug',
      description: 'Encontrou um problema? Nos ajude a corrigi-lo'
    },
    {
      id: 'sugestao',
      icon: LightBulbIcon,
      title: 'Sugestão',
      description: 'Ideias para melhorar o VelocType'
    },
    {
      id: 'feedback',
      icon: HeartIcon,
      title: 'Feedback',
      description: 'Compartilhe sua experiência conosco'
    }
  ]

  const faqs = [
    {
      question: "Como posso acompanhar meu progresso?",
      answer: "Suas estatísticas são salvas automaticamente e podem ser visualizadas na página de Estatísticas. Lá você encontra dados sobre velocidade, precisão e histórico de testes."
    },
    {
      question: "Os recursos premium são pagos?",
      answer: "Atualmente, o VelocType é totalmente gratuito. Recursos marcados como premium estão em desenvolvimento e serão disponibilizados em futuras atualizações."
    },
    {
      question: "Meus dados são sincronizados entre dispositivos?",
      answer: "No momento, seus dados são armazenados localmente em cada dispositivo. Estamos trabalhando em uma funcionalidade de sincronização para contas de usuário."
    },
    {
      question: "Como posso personalizar os exercícios?",
      answer: "Você pode escolher entre diferentes categorias de texto, ajustar a duração dos testes e personalizar configurações como tamanho da fonte e feedback visual."
    },
    {
      question: "O VelocType funciona offline?",
      answer: "Sim! A maioria das funcionalidades funciona offline, pois os dados são armazenados localmente em seu navegador."
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simular envio do formulário
    console.log('Formulário enviado:', formData)
    setIsSubmitted(true)
    
    // Reset após 5 segundos
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        type: 'geral'
      })
    }, 5000)
  }

  return (
    <PageContainer 
      title="Entre em Contato" 
      subtitle="Estamos aqui para ajudar! Envie suas dúvidas, sugestões ou feedback"
    >
      <div className="space-y-12">
        {/* Tipos de contato */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-cyan-700 dark:text-cyan-300 mb-6 text-center">
            Como podemos ajudar?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactTypes.map((type, index) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.type === type.id
                    ? 'bg-cyan-100 border-cyan-500 dark:bg-cyan-900/20 dark:border-cyan-400'
                    : 'bg-[#e0e7ef] border-[#cbd5e1] dark:bg-[#0d1724] dark:border-cyan-900 hover:border-cyan-400'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, type: type.id }))}
              >
                <type.icon className="w-8 h-8 text-cyan-400 mb-3" />
                <h3 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-2">
                  {type.title}
                </h3>
                <p className="text-sm text-cyan-700 dark:text-cyan-100">
                  {type.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Formulário de contato */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="bg-[#e0e7ef] dark:bg-[#0d1724] rounded-xl p-6 border border-[#cbd5e1] dark:border-cyan-900">
            <div className="flex items-center gap-3 mb-6">
              <EnvelopeIcon className="w-8 h-8 text-cyan-400" />
              <h2 className="text-2xl font-bold text-cyan-700 dark:text-cyan-300">
                Envie sua Mensagem
              </h2>
            </div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <CheckCircleIcon className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-cyan-700 dark:text-cyan-300 mb-2">
                  Mensagem Enviada!
                </h3>
                <p className="text-cyan-700 dark:text-cyan-100">
                  Obrigado pelo seu contato. Responderemos em breve!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-cyan-700 dark:text-cyan-300 mb-2">
                      Nome *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-[#cbd5e1] rounded-lg bg-white text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-cyan-500 transition dark:bg-[#162032] dark:text-white dark:border-cyan-700"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-cyan-700 dark:text-cyan-300 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-[#cbd5e1] rounded-lg bg-white text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-cyan-500 transition dark:bg-[#162032] dark:text-white dark:border-cyan-700"
                      placeholder="seu.email@exemplo.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-cyan-700 dark:text-cyan-300 mb-2">
                    Assunto *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-[#cbd5e1] rounded-lg bg-white text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-cyan-500 transition dark:bg-[#162032] dark:text-white dark:border-cyan-700"
                    placeholder="Resumo da sua mensagem"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-cyan-700 dark:text-cyan-300 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full p-3 border border-[#cbd5e1] rounded-lg bg-white text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-cyan-500 transition resize-vertical dark:bg-[#162032] dark:text-white dark:border-cyan-700"
                    placeholder="Descreva sua dúvida, sugestão ou feedback em detalhes..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2 shadow transition"
                >
                  <EnvelopeIcon className="w-5 h-5" />
                  Enviar Mensagem
                </button>
              </form>
            )}
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <QuestionMarkCircleIcon className="w-8 h-8 text-cyan-400" />
            <h2 className="text-2xl font-bold text-cyan-700 dark:text-cyan-300">
              Perguntas Frequentes
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="bg-[#e0e7ef] dark:bg-[#0d1724] rounded-xl p-6 border border-[#cbd5e1] dark:border-cyan-900"
              >
                <h3 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-3">
                  {faq.question}
                </h3>
                <p className="text-cyan-700 dark:text-cyan-100">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Informações adicionais */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center p-6 bg-[#e0e7ef] dark:bg-[#0d1724] rounded-xl border border-[#cbd5e1] dark:border-cyan-900"
        >
          <HeartIcon className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-cyan-700 dark:text-cyan-300 mb-4">
            Seu Feedback é Importante!
          </h3>
          <p className="text-cyan-700 dark:text-cyan-100 mb-4">
            O VelocType está em constante evolução e seu feedback nos ajuda a criar uma experiência 
            cada vez melhor. Não hesite em compartilhar suas ideias, reportar problemas ou simplesmente 
            dizer olá!
          </p>
          <p className="text-sm text-cyan-700 dark:text-cyan-100">
            Tempo médio de resposta: 24-48 horas
          </p>
        </motion.section>
      </div>
    </PageContainer>
  )
}
