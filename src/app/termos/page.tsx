'use client'

import { motion } from 'framer-motion'
import { DocumentTextIcon, ScaleIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import PageContainer from '../components/PageContainer'

export default function Termos() {
  const sections = [
    {
      title: "1. Aceitação dos Termos",
      content: [
        "Ao acessar e utilizar o VelocType, você concorda em cumprir e estar vinculado a estes Termos de Uso.",
        "Se você não concorda com qualquer parte destes termos, não deve utilizar nosso serviço.",
        "Reservamo-nos o direito de modificar estes termos a qualquer momento, sendo sua responsabilidade verificar periodicamente as atualizações."
      ]
    },
    {
      title: "2. Descrição do Serviço",
      content: [
        "O VelocType é uma plataforma web gratuita para treinamento de digitação que oferece exercícios interativos e acompanhamento de progresso.",
        "Nosso serviço inclui diferentes categorias de texto, estatísticas de desempenho e recursos de personalização.",
        "Nos esforçamos para manter o serviço disponível 24/7, mas não garantimos disponibilidade ininterrupta."
      ]
    },
    {
      title: "3. Uso Aceitável",
      content: [
        "Você concorda em usar o VelocType apenas para fins legais e de acordo com estes Termos de Uso.",
        "É proibido usar o serviço para qualquer atividade ilegal, prejudicial ou que viole os direitos de terceiros.",
        "Não é permitido tentar interferir na operação do serviço ou acessar áreas restritas do sistema.",
        "O uso de bots, scripts automatizados ou outras ferramentas para manipular resultados é estritamente proibido."
      ]
    },
    {
      title: "4. Conteúdo e Propriedade Intelectual",
      content: [
        "Todo o conteúdo presente no VelocType, incluindo textos, design, código e logotipos, está protegido por direitos autorais.",
        "Os textos utilizados nos exercícios podem ser de domínio público ou utilizados sob licenças apropriadas.",
        "Você pode usar o serviço para fins pessoais e educacionais, mas não pode reproduzir ou distribuir nosso conteúdo sem autorização.",
        "Respeitamos os direitos de propriedade intelectual de terceiros e esperamos que nossos usuários façam o mesmo."
      ]
    },
    {
      title: "5. Privacidade e Dados Pessoais",
      content: [
        "Sua privacidade é importante para nós. Consulte nossa Política de Privacidade para entender como coletamos e usamos seus dados.",
        "Os dados de progresso são armazenados localmente em seu dispositivo e não são transmitidos para nossos servidores.",
        "Não coletamos informações pessoais identificáveis sem seu consentimento explícito.",
        "Você pode solicitar a exclusão de seus dados a qualquer momento através de nossos canais de contato."
      ]
    },
    {
      title: "6. Limitação de Responsabilidade",
      content: [
        "O VelocType é fornecido 'como está', sem garantias expressas ou implícitas de qualquer tipo.",
        "Não nos responsabilizamos por quaisquer danos diretos, indiretos, incidentais ou consequenciais decorrentes do uso do serviço.",
        "Nossa responsabilidade total, se houver, será limitada ao valor pago pelo serviço nos últimos 12 meses.",
        "Você utiliza o serviço por sua própria conta e risco."
      ]
    },
    {
      title: "7. Recursos Premium",
      content: [
        "Alguns recursos do VelocType podem estar disponíveis apenas para usuários premium.",
        "Os termos de assinatura premium, incluindo preços e políticas de reembolso, serão claramente especificados no momento da compra.",
        "Assinaturas premium são renovadas automaticamente, a menos que canceladas pelo usuário.",
        "Não oferecemos reembolsos para períodos de assinatura já utilizados, exceto quando exigido por lei."
      ]
    },
    {
      title: "8. Suspensão e Encerramento",
      content: [
        "Reservamo-nos o direito de suspender ou encerrar o acesso ao serviço a qualquer momento, com ou sem aviso prévio.",
        "Você pode parar de usar o serviço a qualquer momento, e seus dados locais permanecerão em seu dispositivo.",
        "Em caso de violação destes termos, podemos tomar ações apropriadas, incluindo suspensão permanente.",
        "Estas cláusulas permanecerão em vigor mesmo após o encerramento do serviço."
      ]
    },
    {
      title: "9. Modificações do Serviço",
      content: [
        "Podemos modificar, atualizar ou descontinuar qualquer aspecto do VelocType a qualquer momento.",
        "Notificaremos sobre mudanças significativas através do próprio serviço ou por outros meios apropriados.",
        "Continuamos comprometidos em melhorar a experiência do usuário através de atualizações regulares.",
        "Algumas modificações podem afetar recursos existentes ou introduzir novos recursos premium."
      ]
    },
    {
      title: "10. Lei Aplicável e Jurisdição",
      content: [
        "Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil.",
        "Qualquer disputa relacionada a estes termos será resolvida nos tribunais competentes do Brasil.",
        "Se qualquer cláusula destes termos for considerada inválida, as demais cláusulas permanecerão em pleno vigor.",
        "Estes termos constituem o acordo completo entre você e o VelocType."
      ]
    }
  ]

  return (
    <PageContainer 
      title="Termos de Uso" 
      subtitle="Condições de uso da plataforma VelocType"
    >
      <div className="space-y-8">
        {/* Última atualização */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center gap-3 p-4 bg-[#e0e7ef] dark:bg-[#0d1724] rounded-xl border border-[#cbd5e1] dark:border-cyan-900"
        >
          <DocumentTextIcon className="w-6 h-6 text-cyan-400" />
          <div>
            <p className="font-semibold text-cyan-700 dark:text-cyan-300">Última atualização: 16 de julho de 2025</p>
            <p className="text-sm text-cyan-700 dark:text-cyan-100">
              Versão 1.0 - Termos iniciais da plataforma
            </p>
          </div>
        </motion.div>

        {/* Introdução */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="prose prose-cyan max-w-none"
        >
          <div className="flex items-center gap-3 mb-4">
            <ScaleIcon className="w-8 h-8 text-cyan-400" />
            <h2 className="text-2xl font-bold text-cyan-700 dark:text-cyan-300 m-0">Introdução</h2>
          </div>
          <p className="text-cyan-700 dark:text-cyan-100 leading-relaxed">
            Bem-vindo ao VelocType! Estes Termos de Uso estabelecem as regras e condições para o uso de nossa 
            plataforma de treinamento de digitação. Ao utilizar nossos serviços, você concorda em estar 
            vinculado a estes termos. Por favor, leia-os cuidadosamente.
          </p>
        </motion.div>

        {/* Seções dos termos */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="border-b border-[#cbd5e1] dark:border-cyan-900 pb-6 last:border-b-0"
            >
              <h3 className="text-lg font-semibold text-cyan-700 dark:text-cyan-300 mb-4">
                {section.title}
              </h3>
              <div className="space-y-3">
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-cyan-700 dark:text-cyan-100 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contato */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="mt-12 p-6 bg-[#e0e7ef] dark:bg-[#0d1724] rounded-xl border border-[#cbd5e1] dark:border-cyan-900"
        >
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheckIcon className="w-6 h-6 text-cyan-400" />
            <h3 className="text-lg font-semibold text-cyan-700 dark:text-cyan-300">
              Dúvidas sobre os Termos?
            </h3>
          </div>
          <p className="text-cyan-700 dark:text-cyan-100">
            Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco através da 
            nossa página de contato. Estamos aqui para ajudar e esclarecer qualquer questão.
          </p>
        </motion.div>
      </div>
    </PageContainer>
  )
}
