'use client'

import { motion } from 'framer-motion'
import { 
  ShieldCheckIcon, 
  EyeSlashIcon, 
  ServerIcon, 
  CogIcon, 
  ExclamationTriangleIcon,
  LockClosedIcon 
} from '@heroicons/react/24/outline'
import PageContainer from '../components/PageContainer'

export default function Privacidade() {
  const sections = [
    {
      icon: EyeSlashIcon,
      title: "1. Informações que Coletamos",
      content: [
        "O DigiteMais prioriza sua privacidade e coleta apenas as informações mínimas necessárias para fornecer nossos serviços.",
        "Dados de Uso: Coletamos informações sobre como você usa nossa plataforma, incluindo tempo de sessão, exercícios realizados e preferências de configuração.",
        "Dados de Performance: Velocidade de digitação, precisão, estatísticas de progresso e histórico de testes são armazenados localmente em seu dispositivo.",
        "Dados Técnicos: Informações básicas sobre seu navegador, sistema operacional e resolução de tela para otimizar a experiência do usuário.",
        "Não coletamos informações pessoais identificáveis como nome, e-mail ou endereço sem seu consentimento explícito."
      ]
    },
    {
      icon: ServerIcon,
      title: "2. Como Usamos suas Informações",
      content: [
        "Fornecimento do Serviço: Utilizamos seus dados para entregar a funcionalidade principal da plataforma de treinamento de digitação.",
        "Melhoria da Experiência: Analisamos padrões de uso para identificar áreas de melhoria e desenvolver novos recursos.",
        "Personalização: Suas preferências são usadas para personalizar a interface e sugerir exercícios adequados ao seu nível.",
        "Suporte Técnico: Dados técnicos nos ajudam a diagnosticar e resolver problemas que você possa encontrar.",
        "Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins comerciais."
      ]
    },
    {
      icon: LockClosedIcon,
      title: "3. Armazenamento Local de Dados",
      content: [
        "Prioridade ao Armazenamento Local: A maioria dos seus dados, incluindo estatísticas e preferências, são armazenados localmente em seu dispositivo.",
        "Controle Total: Você tem controle total sobre seus dados locais e pode limpá-los a qualquer momento através das configurações do navegador.",
        "Backup Local: Recomendamos que você faça backup de suas estatísticas importantes, pois a limpeza do cache do navegador pode remover esses dados.",
        "Sem Sincronização Automática: Não sincronizamos automaticamente seus dados entre dispositivos, garantindo maior privacidade.",
        "Acesso Offline: Muitas funcionalidades funcionam offline, demonstrando nosso compromisso com o armazenamento local."
      ]
    },
    {
      icon: CogIcon,
      title: "4. Cookies e Tecnologias Similares",
      content: [
        "Cookies Essenciais: Utilizamos cookies necessários para o funcionamento básico da plataforma, como manter suas preferências de tema.",
        "LocalStorage: Usamos o armazenamento local do navegador para salvar suas estatísticas e configurações de forma segura.",
        "Sem Cookies de Rastreamento: Não utilizamos cookies de rastreamento de terceiros ou para fins publicitários.",
        "Controle de Cookies: Você pode gerenciar os cookies através das configurações do seu navegador.",
        "Transparência: Todas as tecnologias que utilizamos são claramente documentadas e têm propósitos específicos relacionados ao funcionamento do serviço."
      ]
    },
    {
      icon: ShieldCheckIcon,
      title: "5. Segurança dos Dados",
      content: [
        "Criptografia: Utilizamos HTTPS para criptografar todas as comunicações entre seu dispositivo e nossos servidores.",
        "Segurança Local: Seus dados são protegidos pelas medidas de segurança do seu próprio dispositivo e navegador.",
        "Atualizações de Segurança: Mantemos nossa plataforma atualizada com as últimas práticas de segurança.",
        "Acesso Limitado: Apenas pessoal autorizado tem acesso aos sistemas que podem conter dados dos usuários.",
        "Monitoramento: Monitoramos continuamente nossos sistemas em busca de atividades suspeitas ou tentativas de violação."
      ]
    },
    {
      icon: ExclamationTriangleIcon,
      title: "6. Compartilhamento de Informações",
      content: [
        "Política de Não Compartilhamento: Como regra geral, não compartilhamos suas informações pessoais com terceiros.",
        "Prestadores de Serviço: Podemos compartilhar dados com prestadores de serviços confiáveis que nos ajudam a operar a plataforma, sempre sob acordos de confidencialidade.",
        "Requisitos Legais: Podemos divulgar informações quando exigido por lei ou para proteger nossos direitos legais.",
        "Transferência de Negócios: Em caso de fusão ou aquisição, seus dados podem ser transferidos, mas apenas sob os mesmos termos de privacidade.",
        "Dados Anonimizados: Podemos compartilhar estatísticas agregadas e anonimizadas para fins de pesquisa ou melhoria do serviço."
      ]
    }
  ]

  const rights = [
    "Acessar suas informações pessoais que possuímos",
    "Corrigir informações imprecisas ou desatualizadas",
    "Solicitar a exclusão de suas informações pessoais",
    "Restringir o processamento de suas informações",
    "Obter uma cópia de suas informações em formato legível",
    "Retirar seu consentimento a qualquer momento"
  ]

  return (
    <PageContainer 
      title="Política de Privacidade" 
      subtitle="Como protegemos e utilizamos suas informações no DigiteMais"
    >
      <div className="space-y-8">
        {/* Última atualização */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center gap-3 p-4 bg-[#e0e7ef] dark:bg-[#0d1724] rounded-xl border border-[#cbd5e1] dark:border-cyan-900"
        >
          <ShieldCheckIcon className="w-6 h-6 text-cyan-400" />
          <div>
            <p className="font-semibold text-cyan-700 dark:text-cyan-300">Última atualização: 16 de julho de 2025</p>
            <p className="text-sm text-cyan-700 dark:text-cyan-100">
              Versão 1.0 - Política inicial de privacidade
            </p>
          </div>
        </motion.div>

        {/* Introdução */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-lg text-cyan-700 dark:text-cyan-100 leading-relaxed">
            No DigiteMais, levamos sua privacidade a sério. Esta Política de Privacidade explica como coletamos, 
            usamos, protegemos e compartilhamos suas informações quando você utiliza nossa plataforma de 
            treinamento de digitação. Nosso compromisso é com a transparência e o controle sobre seus dados.
          </p>
        </motion.div>

        {/* Seções principais */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="border border-[#cbd5e1] dark:border-cyan-900 rounded-xl p-6 bg-[#e0e7ef] dark:bg-[#0d1724]"
            >
              <div className="flex items-center gap-3 mb-4">
                <section.icon className="w-8 h-8 text-cyan-400" />
                <h3 className="text-xl font-semibold text-cyan-700 dark:text-cyan-300">
                  {section.title}
                </h3>
              </div>
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

        {/* Seus Direitos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="border border-[#cbd5e1] dark:border-cyan-900 rounded-xl p-6 bg-[#e0e7ef] dark:bg-[#0d1724]"
        >
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheckIcon className="w-8 h-8 text-cyan-400" />
            <h3 className="text-xl font-semibold text-cyan-700 dark:text-cyan-300">
              7. Seus Direitos de Privacidade
            </h3>
          </div>
          <p className="text-cyan-700 dark:text-cyan-100 mb-4">
            Você tem os seguintes direitos em relação às suas informações pessoais:
          </p>
          <ul className="space-y-2">
            {rights.map((right, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-cyan-700 dark:text-cyan-100">{right}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Retenção de Dados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="border border-[#cbd5e1] dark:border-cyan-900 rounded-xl p-6 bg-[#e0e7ef] dark:bg-[#0d1724]"
        >
          <div className="flex items-center gap-3 mb-4">
            <ServerIcon className="w-8 h-8 text-cyan-400" />
            <h3 className="text-xl font-semibold text-cyan-700 dark:text-cyan-300">
              8. Retenção de Dados
            </h3>
          </div>
          <div className="space-y-3 text-cyan-700 dark:text-cyan-100">
            <p>
              Mantemos suas informações apenas pelo tempo necessário para fornecer nossos serviços e 
              cumprir nossas obrigações legais.
            </p>
            <p>
              Dados armazenados localmente permanecem em seu dispositivo até que você os remova. 
              Dados em nossos servidores são excluídos quando não são mais necessários.
            </p>
            <p>
              Você pode solicitar a exclusão de suas informações a qualquer momento, e atenderemos 
              sua solicitação dentro dos prazos legais aplicáveis.
            </p>
          </div>
        </motion.div>

        {/* Alterações na Política */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="border border-[#cbd5e1] dark:border-cyan-900 rounded-xl p-6 bg-[#e0e7ef] dark:bg-[#0d1724]"
        >
          <div className="flex items-center gap-3 mb-4">
            <CogIcon className="w-8 h-8 text-cyan-400" />
            <h3 className="text-xl font-semibold text-cyan-700 dark:text-cyan-300">
              9. Alterações nesta Política
            </h3>
          </div>
          <div className="space-y-3 text-cyan-700 dark:text-cyan-100">
            <p>
              Podemos atualizar esta Política de Privacidade ocasionalmente para refletir mudanças 
              em nossas práticas ou por outros motivos operacionais, legais ou regulamentares.
            </p>
            <p>
              Notificaremos sobre alterações significativas através da plataforma ou por outros meios 
              apropriados. A data da última atualização sempre será indicada no topo desta página.
            </p>
            <p>
              Recomendamos que você revise esta política periodicamente para se manter informado 
              sobre como protegemos suas informações.
            </p>
          </div>
        </motion.div>

        {/* Contato */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="text-center p-6 bg-[#e0e7ef] dark:bg-[#0d1724] rounded-xl border border-[#cbd5e1] dark:border-cyan-900"
        >
          <h3 className="text-xl font-semibold text-cyan-700 dark:text-cyan-300 mb-4">
            Dúvidas sobre Privacidade?
          </h3>
          <p className="text-cyan-700 dark:text-cyan-100 mb-4">
            Se você tiver alguma dúvida sobre esta Política de Privacidade ou sobre como tratamos 
            suas informações, não hesite em entrar em contato conosco.
          </p>
          <p className="text-sm text-cyan-700 dark:text-cyan-100">
            Estamos comprometidos em responder suas perguntas e resolver suas preocupações sobre privacidade.
          </p>
        </motion.div>
      </div>
    </PageContainer>
  )
}
