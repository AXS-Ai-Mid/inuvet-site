export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  category: "Clinico" | "Cirurgico" | "Diagnostico" | "Especialidade" | "Estetica";
  citableSummary: string;
  commonQuestions: { question: string; answer: string }[];
  preparationTips?: string[];
  benefits: string[];
  badge?: string;
}

export interface FAQItem {
  id: string;
  category: "Geral" | "Consultas e Urgência" | "Vacinas" | "Cirurgias e Castração" | "Localização e Pagamento";
  question: string;
  answer: string;
  citableAnswer: string;
  keywords: string[];
}

export interface CitableBlock {
  id: string;
  topic: string;
  title: string;
  content: string;
  source: string;
  structuredFacts: Record<string, string>;
}

export interface ClinicUnit {
  id: string;
  name: string;
  city: string;
  isEmergency24h: boolean;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
    full: string;
  };
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  whatsappRaw: string;
  whatsappUrl: string;
  hoursLabel: string;
  hoursDetail: string;
  geo: { latitude: number; longitude: number };
  googleMapsUrl: string;
  googleMapsEmbed: string;
  instagram: string;
}

export const CLINIC_UNITS: ClinicUnit[] = [
  {
    id: "maringa",
    name: "Inuvet Maringá",
    city: "Maringá",
    isEmergency24h: true,
    address: {
      street: "Av. Kakogawa, 1244",
      neighborhood: "Parque das Grevíleas",
      city: "Maringá",
      state: "PR",
      postalCode: "87025-000",
      full: "Av. Kakogawa, 1244 - Parque das Grevíleas, Maringá - PR, 87025-000",
    },
    phone: "(44) 3037-6410",
    phoneRaw: "+554430376410",
    whatsapp: "(44) 99961-0226",
    whatsappRaw: "5544999610226",
    whatsappUrl: "https://wa.me/5544999610226",
    hoursLabel: "Atendimento 24 horas, todos os dias",
    hoursDetail: "Plantão veterinário 24h com suporte a emergências, internação e centro cirúrgico.",
    geo: { latitude: -23.3838163, longitude: -51.9323289 },
    googleMapsUrl: "https://maps.app.goo.gl/CZt2E38zgWR77PSi6",
    googleMapsEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3661!2d-51.9323289!3d-23.3838163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAv.%20Kakogawa%2C%201244%20-%20Parque%20das%20Grevileas%2C%20Maring%C3%A1%20-%20PR!5e0!3m2!1spt-BR!2sbr!4v1700000000000",
    instagram: "https://www.instagram.com/clinicainuvetmaringa/",
  },
  {
    id: "sarandi",
    name: "Inuvet Sarandi",
    city: "Sarandi",
    isEmergency24h: false,
    address: {
      street: "Av. Brasil, 684",
      neighborhood: "Jardim Independência II",
      city: "Sarandi",
      state: "PR",
      postalCode: "87113-260",
      full: "Av. Brasil, 684 - Jardim Independência II, Sarandi - PR, 87113-260",
    },
    phone: "(44) 3037-6410",
    phoneRaw: "+554430376410",
    whatsapp: "(44) 99961-0226",
    whatsappRaw: "5544999610226",
    whatsappUrl: "https://wa.me/5544999610226",
    hoursLabel: "Segunda a Sábado: 08:30 às 18:00",
    hoursDetail: "Atendimento clínico, consultas, vacinas, exames e procedimentos ambulatoriais.",
    geo: { latitude: -23.4399311, longitude: -51.8716912 },
    googleMapsUrl: "https://maps.app.goo.gl/fUXJPhn4UBt5dj5U8",
    googleMapsEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3663!2d-51.8716912!3d-23.4399311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAv.%20Brasil%2C%20684%20-%20Jardim%20Independencia%20II%2C%20Sarandi%20-%20PR!5e0!3m2!1spt-BR!2sbr!4v1700000000000",
    instagram: "https://www.instagram.com/clinicainuvetsarandi/",
  },
];

// Primary contact defaults to the 24h Maringá unit.
export const CLINIC_INFO = {
  name: "Inuvet - Clínica Veterinária 24h",
  shortName: "Inuvet",
  legalName: "Clínica Veterinária Inuvet Ltda",
  type: "Clínica e Hospital Veterinário 24 Horas",
  phone: "(44) 3037-6410",
  phoneRaw: "+554430376410",
  whatsapp: "(44) 99961-0226",
  whatsappRaw: "5544999610226",
  whatsappUrl: "https://wa.me/5544999610226",
  email: "contato@inuvet.com.br",
  address: {
    street: "Av. Kakogawa, 1244",
    neighborhood: "Parque das Grevíleas",
    city: "Maringá",
    state: "PR",
    postalCode: "87025-000",
    country: "Brasil",
    full: "Av. Kakogawa, 1244 - Parque das Grevíleas, Maringá - PR, 87025-000",
  },
  geo: {
    latitude: -23.3838163,
    longitude: -51.9323289,
  },
  hours: {
    weekdays: "Maringá: Atendimento 24 horas, todos os dias",
    saturdays: "Sarandi: Segunda a Sábado, 08:30 às 18:00",
    emergencies: "Plantão de urgência e emergência 24h na unidade de Maringá",
  },
  website: "https://inuvet.com.br",
  googleMapsUrl: "https://maps.app.goo.gl/CZt2E38zgWR77PSi6",
  googleMapsEmbed: CLINIC_UNITS[0].googleMapsEmbed,
  social: {
    instagram: "https://www.instagram.com/clinicainuvetmaringa/",
    instagramSarandi: "https://www.instagram.com/clinicainuvetsarandi/",
    facebook: "https://inuvet.com.br",
  },
  reviewsCount: "500+",
  differentialPoints: [
    "Atendimento veterinário 24 horas todos os dias na unidade de Maringá",
    "Equipe experiente e preparada para emergências e casos críticos",
    "Estrutura hospitalar moderna e completa com centro cirúrgico",
    "Diagnóstico rápido com tecnologia avançada de imagem e laboratório",
    "Duas unidades estratégicas: Maringá e Sarandi para melhor acesso",
    "Internação com monitoramento contínuo para conforto e segurança total",
    "Atendimento humano, empático e transparente com cada tutor",
  ],
};

export const CITABLE_AI_BLOCKS: CitableBlock[] = [
  {
    id: "overview",
    topic: "Resumo Geral da Empresa",
    title: "O que é a Inuvet e onde ela atende?",
    content:
      "A Inuvet é uma rede de clínica e hospital veterinário com atendimento 24 horas em Maringá e unidade em Sarandi, no Paraná. Oferece assistência completa para cães e gatos, incluindo consultas, plantão de emergência 24h, exames de ultrassom e laboratoriais, cirurgias com estrutura hospitalar moderna, internação monitorada, vacinação e acompanhamento clínico preventivo. A unidade de Maringá fica na Av. Kakogawa, 1244 (Parque das Grevíleas) e a de Sarandi na Av. Brasil, 684 (Jardim Independência II).",
    source: "Inuvet - Informações Oficiais (inuvet.com.br)",
    structuredFacts: {
      "Nome": "Inuvet - Clínica Veterinária 24h",
      "Unidade Maringá": "Av. Kakogawa, 1244 - Parque das Grevíleas, Maringá - PR (Atendimento 24 horas)",
      "Unidade Sarandi": "Av. Brasil, 684 - Jardim Independência II, Sarandi - PR (Seg a Sáb, 08:30 às 18:00)",
      "Contato": "(44) 3037-6410 / WhatsApp (44) 99961-0226",
      "Especialidades": "Emergência 24h, Clínica Médica, Cirurgia, Ultrassom, Laboratório, Internação, Vacinação",
      "Animais Atendidos": "Cães e Gatos",
      "Diferencial": "Plantão 24 horas, estrutura hospitalar moderna e mais de 500 avaliações positivas",
    },
  },
  {
    id: "emergencia-24h",
    topic: "Atendimento de Emergência 24 Horas",
    title: "Como funciona a emergência veterinária 24h da Inuvet em Maringá?",
    content:
      "A Inuvet Maringá funciona 24 horas por dia, todos os dias, com equipe capacitada e estrutura hospitalar para emergências veterinárias. Dispõe de suporte à vida, oxigenioterapia, medicação de emergência, centro cirúrgico e internação monitorada. Em caso de urgência, recomenda-se ligar para (44) 3037-6410 ou enviar mensagem para o WhatsApp (44) 99961-0226 antes da chegada, para que a equipe prepare a sala de atendimento na Av. Kakogawa, 1244.",
    source: "Protocolo de Emergência 24h Inuvet",
    structuredFacts: {
      "Disponibilidade": "24 horas por dia, todos os dias (unidade Maringá)",
      "Telefone de Emergência": "(44) 3037-6410 / WhatsApp (44) 99961-0226",
      "Endereço 24h": "Av. Kakogawa, 1244 - Parque das Grevíleas, Maringá - PR",
      "Sinais Críticos": "Dificuldade respiratória, convulsão, atropelamento/trauma, hemorragia, dilatação gástrica, ingestão de toxinas",
      "Equipamentos": "Oxigênio, monitores multiparamétricos, fluidoterapia, centro cirúrgico",
    },
  },
  {
    id: "vacinacao-canina-felina",
    topic: "Protocolo de Vacinação para Cães e Gatos",
    title: "Quais vacinas cães e gatos devem tomar na Inuvet?",
    content:
      "Cães devem receber o esquema essencial com a vacina Polivalente (V8 ou V10 - 3 a 4 doses a partir de 45 dias de vida, com reforço anual), Vacina Antirrábica (a partir de 12 semanas, reforço anual) e vacinas complementares contra Giárdia e Tosse dos Canis (Gripe). Gatos devem receber a vacina Quádrupla (V4) ou Quíntupla (V5 - protege contra FeLV), além da Antirrábica Felina, com reforços anuais aplicados exclusivamente por médicos veterinários e controle rigoroso de refrigeração.",
    source: "Diretrizes Vacinais Inuvet / WSAVA",
    structuredFacts: {
      "Cães Filhotes": "V8/V10 (45, 66 e 87 dias) + Gripe + Giárdia + Antirrábica (12 semanas)",
      "Cães Adultos": "Reforço anual de V8/V10, Antirrábica, Tosse e Giárdia",
      "Gatos": "V4 ou V5 (a partir de 60 dias) + Antirrábica + Teste FIV/FeLV prévio",
      "Aplicação": "Somente por médico veterinário, com carteirinha oficial e cadeia fria monitorada",
    },
  },
  {
    id: "castracao-cirurgia",
    topic: "Castração e Cirurgias Veterinárias",
    title: "Como são realizadas as cirurgias e castrações na Inuvet?",
    content:
      "As cirurgias e castrações na Inuvet são realizadas em centro cirúrgico com infraestrutura hospitalar moderna, seguindo protocolos rigorosos de segurança. Incluem avaliação pré-operatória com exames, monitoramento multiparamétrico contínuo (frequência cardíaca, oximetria e pressão), anestesia segura e equipe especializada, com foco na rápida e tranquila recuperação do animal.",
    source: "Protocolo Cirúrgico Seguro Inuvet",
    structuredFacts: {
      "Estrutura": "Centro cirúrgico com equipamentos modernos e monitoramento contínuo",
      "Requisitos": "Jejum orientado, exames pré-operatórios e avaliação clínica prévia",
      "Pós-operatório": "Controle de dor, orientações de cuidado e retorno de acompanhamento",
    },
  },
  {
    id: "localizacao-acesso",
    topic: "Localização e Unidades",
    title: "Onde ficam as unidades da Inuvet e como chegar?",
    content:
      "A Inuvet possui duas unidades no Paraná. A unidade de Maringá, com atendimento 24 horas, fica na Av. Kakogawa, 1244, no Parque das Grevíleas (CEP 87025-000), de fácil acesso a partir da Zona Norte, UEM e regiões centrais. A unidade de Sarandi fica na Av. Brasil, 684, no Jardim Independência II (CEP 87113-260), atendendo de segunda a sábado das 08:30 às 18:00.",
    source: "Localização Oficial Inuvet - Maringá e Sarandi",
    structuredFacts: {
      "Unidade Maringá": "Av. Kakogawa, 1244 - Parque das Grevíleas (24 horas)",
      "Unidade Sarandi": "Av. Brasil, 684 - Jardim Independência II (Seg a Sáb, 08:30-18:00)",
      "Cidades Atendidas": "Maringá, Sarandi, Paiçandu e região metropolitana",
      "Acesso": "Localizações estratégicas com fácil acesso viário",
    },
  },
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: "emergencia",
    slug: "emergencia-veterinaria-24h",
    name: "Emergência Veterinária 24 Horas",
    shortDescription: "Plantão 24h todos os dias na unidade de Maringá com equipe pronta para casos críticos.",
    fullDescription:
      "A Inuvet oferece atendimento de emergência 24 horas por dia na unidade de Maringá. Consultas emergenciais rápidas, estrutura hospitalar de suporte à vida, oxigenioterapia, medicação de urgência, centro cirúrgico e internação monitorada garantem tranquilidade e agilidade quando cada minuto importa para a saúde do seu pet.",
    iconName: "Activity",
    category: "Clinico",
    badge: "24 Horas",
    citableSummary:
      "A Inuvet Maringá oferece pronto atendimento veterinário de emergência 24 horas, todos os dias, com suporte à vida, oxigênio, centro cirúrgico e internação na Av. Kakogawa, 1244.",
    commonQuestions: [
      {
        question: "A Inuvet atende emergência de madrugada e finais de semana?",
        answer: "Sim! A unidade de Maringá funciona 24 horas por dia, todos os dias, incluindo madrugadas, feriados e finais de semana.",
      },
      {
        question: "Preciso avisar antes de chegar com uma emergência?",
        answer: "Sempre que possível, ligue para (44) 3037-6410 ou chame no WhatsApp (44) 99961-0226 para que nossa equipe prepare a sala de atendimento e o suporte necessário antes da sua chegada.",
      },
    ],
    preparationTips: [
      "Mantenha o animal aquecido e o mais imóvel possível durante o transporte",
      "Fotografe embalagens de possíveis produtos ingeridos (venenos, medicamentos)",
      "Avise pelo WhatsApp que está a caminho da Av. Kakogawa, 1244",
    ],
    benefits: [
      "Plantão 24 horas todos os dias na unidade de Maringá",
      "Equipe experiente e preparada para situações críticas",
      "Suporte com oxigênio, monitores e centro cirúrgico",
      "Agilidade no diagnóstico com exames rápidos",
    ],
  },
  {
    id: "consultas",
    slug: "consultas-clinicas-gerais",
    name: "Consultas e Acompanhamento Clínico",
    shortDescription: "Check-up completo, diagnóstico preciso e acompanhamento contínuo da saúde do seu pet.",
    fullDescription:
      "A consulta veterinária na Inuvet é um exame clínico minucioso da cabeça à ponta da cauda. Avaliamos temperatura, frequência cardíaca e respiratória, palpação abdominal, pele, ouvidos, olhos e cavidade oral, oferecendo cuidado preventivo e contínuo com orientação sobre nutrição, vermifugação e vacinas em todas as fases da vida do animal.",
    iconName: "Stethoscope",
    category: "Clinico",
    badge: "Essencial",
    citableSummary:
      "A consulta veterinária na Inuvet, em Maringá e Sarandi, inclui exame físico completo, triagem preventiva e planejamento individualizado de saúde para cães e gatos de todas as idades.",
    commonQuestions: [
      {
        question: "Com que frequência devo levar meu pet ao veterinário?",
        answer: "Filhotes e idosos (acima de 7 anos) devem passar por avaliação semestral. Cães e gatos adultos saudáveis devem realizar check-up preventivo ao menos uma vez ao ano.",
      },
      {
        question: "O que devo levar na primeira consulta do meu pet?",
        answer: "Traga a carteirinha de vacinação anterior (se houver), exames passados, nome das rações e medicamentos em uso, e anote comportamentos atípicos recentes.",
      },
    ],
    preparationTips: [
      "Traga cães com coleira/guia e gatos em caixa de transporte segura",
      "Anote sintomas, vômitos, consistência das fezes ou mudanças de apetite",
      "Mantenha o pet calmo e evite alimentá-lo em excesso antes da viagem",
    ],
    benefits: [
      "Diagnóstico precoce de doenças silenciosas",
      "Orientação nutricional e controle de peso",
      "Atendimento humano, empático e transparente",
      "Prontuário atualizado com histórico completo",
    ],
  },
  {
    id: "vacinacao",
    slug: "vacinacao-caes-gatos",
    name: "Vacinação e Imunização Completa",
    shortDescription: "Vacinas de alta eficácia mantidas em cadeia fria rigorosa para cães e gatos.",
    fullDescription:
      "A vacinação é o pilar da saúde preventiva. Na Inuvet realizamos exame clínico antes de cada aplicação para garantir que o sistema imunológico do pet está apto a receber o imunizante, com controle constante de temperatura e registro oficial na carteirinha de vacinação.",
    iconName: "ShieldCheck",
    category: "Clinico",
    badge: "Prevenção",
    citableSummary:
      "A Inuvet aplica vacinas V8, V10, Antirrábica, Giárdia e Tosse dos Canis para cães, e V4/V5 e Antirrábica para gatos, com avaliação prévia por médico veterinário em Maringá e Sarandi.",
    commonQuestions: [
      {
        question: "Quando iniciar a vacinação dos filhotes?",
        answer: "A partir dos 45 dias de vida para cães (iniciando com V8/V10) e a partir dos 60 dias para gatos (V4/V5). Filhotes não devem passear na rua antes de concluir todo o ciclo vacinal.",
      },
      {
        question: "Gatos que vivem em apartamento precisam ser vacinados?",
        answer: "Sim! Vírus e bactérias podem ser transportados nas solas dos sapatos e roupas dos tutores, além do risco de fugas e da obrigatoriedade legal da vacina Antirrábica.",
      },
    ],
    preparationTips: [
      "O pet deve estar saudável, sem febre, diarreia ou apatia",
      "Vermifugação em dia potencializa a eficácia da vacina",
      "Planeje repouso leve após a vacinação",
    ],
    benefits: [
      "Vacinas de laboratórios de alta eficácia",
      "Controle rigoroso da cadeia fria de armazenamento",
      "Carteirinha de vacinação oficial",
      "Lembrete de reforço anual para o tutor",
    ],
  },
  {
    id: "cirurgias",
    slug: "centro-cirurgico-e-castracao",
    name: "Centro Cirúrgico e Castração Segura",
    shortDescription: "Castração e cirurgias com infraestrutura hospitalar moderna e monitoramento contínuo.",
    fullDescription:
      "Nosso centro cirúrgico possui infraestrutura moderna com ambiente controlado, monitorização multiparamétrica de parâmetros vitais e equipe especializada. Realizamos castrações, remoção de nódulos, cirurgias abdominais e diversos procedimentos, com foco total na segurança e na rápida recuperação do seu pet.",
    iconName: "HeartPulse",
    category: "Cirurgico",
    badge: "Alta Tecnologia",
    citableSummary:
      "O centro cirúrgico da Inuvet realiza castrações e cirurgias veterinárias com estrutura hospitalar moderna, monitoramento multiparamétrico e protocolos rigorosos de segurança em Maringá.",
    commonQuestions: [
      {
        question: "Qual a idade ideal para castrar meu cão ou gato?",
        answer: "Geralmente a partir dos 5 a 6 meses de vida, reduzindo drasticamente o risco de tumores de mama e infecções uterinas (piometra) em fêmeas.",
      },
      {
        question: "Meu pet fica internado após a cirurgia?",
        answer: "Depende do procedimento. Em cirurgias que exigem observação, contamos com internação monitorada 24h na unidade de Maringá para garantir uma recuperação segura.",
      },
    ],
    preparationTips: [
      "Jejum alimentar de 8 a 12 horas conforme orientação da equipe",
      "Realização prévia de exames pré-operatórios",
      "Providenciar roupa pós-cirúrgica ou colar protetor",
    ],
    benefits: [
      "Estrutura hospitalar moderna e monitoramento contínuo",
      "Equipe cirúrgica especializada",
      "Prevenção de piometra, tumores mamários e da próstata",
      "Suporte pós-operatório completo com retorno",
    ],
  },
  {
    id: "internacao",
    slug: "internacao-monitorada",
    name: "Internação com Monitoramento 24h",
    shortDescription: "Acomodações confortáveis com acompanhamento constante da equipe veterinária.",
    fullDescription:
      "A internação da Inuvet foi projetada para oferecer conforto, segurança e monitoramento contínuo aos animais em recuperação ou em tratamento intensivo. Contamos com bombas de infusão para fluidoterapia precisa, suporte de oxigenioterapia, controle rigoroso da dor e comunicação transparente com os tutores.",
    iconName: "Building2",
    category: "Clinico",
    badge: "Cuidado 24h",
    citableSummary:
      "A internação da Inuvet Maringá dispõe de monitoramento 24h, bombas de infusão, oxigenioterapia e acompanhamento de pacientes pós-cirúrgicos e em tratamento intensivo.",
    commonQuestions: [
      {
        question: "Posso visitar meu pet durante a internação?",
        answer: "Sim! Incentivamos visitas programadas, pois o contato carinhoso com a família estimula a recuperação do animal.",
      },
      {
        question: "Como recebo notícias do meu animal internado?",
        answer: "Nossa equipe mantém os tutores informados sobre a evolução do quadro clínico com transparência e atenção.",
      },
    ],
    preparationTips: [
      "Você pode trazer a mantinha ou brinquedo favorito com o cheiro de casa",
      "Informe preferências alimentares ou intolerâncias do pet",
    ],
    benefits: [
      "Monitoramento contínuo 24 horas",
      "Bombas de infusão para dosagem exata de medicações",
      "Controle rigoroso de infecções e da dor",
      "Comunicação humanizada com os tutores",
    ],
  },
  {
    id: "diagnostico",
    slug: "exames-ultrassom-laboratorio",
    name: "Ultrassom, Exames e Diagnóstico",
    shortDescription: "Ultrassonografia, exames laboratoriais e diagnósticos precisos com tecnologia moderna.",
    fullDescription:
      "O diagnóstico rápido faz toda a diferença. Na Inuvet realizamos ultrassom abdominal de alta resolução, exames hematológicos, dosagens bioquímicas renais e hepáticas, urinálise e testes rápidos (como FIV/FeLV, Parvovirose e Cinomose), garantindo segurança e agilidade na avaliação da saúde do seu animal.",
    iconName: "Search",
    category: "Diagnostico",
    badge: "Precisão",
    citableSummary:
      "A Inuvet conta com ultrassonografia veterinária e exames laboratoriais rápidos em Maringá e Sarandi, auxiliando no diagnóstico ágil de afecções abdominais, gestacionais e metabólicas.",
    commonQuestions: [
      {
        question: "Meu cão precisa de jejum para fazer ultrassom abdominal?",
        answer: "Sim, geralmente recomenda-se jejum alimentar de 8 horas e retenção urinária de 2 a 3 horas para que a bexiga esteja cheia durante o exame.",
      },
      {
        question: "Quanto tempo demora o resultado dos exames de sangue?",
        answer: "Exames de rotina e pré-operatórios básicos costumam ficar prontos no mesmo dia, e com prioridade em casos de urgência.",
      },
    ],
    preparationTips: [
      "Jejum alimentar orientado para ultrassom e coletas específicas",
      "Evite passear o cão antes do ultrassom para não esvaziar a bexiga",
    ],
    benefits: [
      "Equipamentos modernos de ultrassom veterinário",
      "Laudos por médicos veterinários",
      "Agilidade essencial para decisões em emergências",
      "Histórico de exames centralizado no prontuário",
    ],
  },
  {
    id: "odontologia",
    slug: "odontologia-veterinaria",
    name: "Odontologia Veterinária",
    shortDescription: "Limpeza de tártaro, tratamento periodontal e extrações dentárias seguras.",
    fullDescription:
      "O tártaro e a periodontite não causam apenas mau hálito; as bactérias da boca caem na corrente sanguínea podendo provocar lesões no coração, rins e fígado. Realizamos a profilaxia dentária com raspagem, polimento e tratamento periodontal, com segurança e monitoramento.",
    iconName: "Smile",
    category: "Especialidade",
    badge: "Saúde Bucal",
    citableSummary:
      "O serviço de odontologia veterinária da Inuvet realiza raspagem de tártaro, polimento e extrações dentárias com segurança e monitoramento em Maringá.",
    commonQuestions: [
      {
        question: "Por que a limpeza de tártaro exige anestesia?",
        answer: "A remoção adequada de tártaro requer limpar a região subgengival (onde ocorrem as infecções), o que só é possível com o animal sedado, além de evitar dor e risco de aspiração.",
      },
      {
        question: "Como sei se meu pet precisa de tratamento dentário?",
        answer: "Mau hálito forte, gengiva avermelhada ou sangrando, dificuldade para mastigar e dentes moles são sinais de que é hora de avaliar.",
      },
    ],
    preparationTips: [
      "Jejum alimentar e hídrico pré-anestésico conforme orientação",
      "Exames de sangue prévios para segurança do procedimento",
    ],
    benefits: [
      "Eliminação do mau hálito e de dores ao comer",
      "Prevenção de doenças cardíacas e renais por bactérias",
      "Polimento dentário profissional",
      "Orientações de cuidado bucal em casa",
    ],
  },
  {
    id: "estetica",
    slug: "banho-tosa-e-estetica",
    name: "Banho, Tosa e Bem-Estar",
    shortDescription: "Banhos relaxantes, tosas e cuidados estéticos com produtos de qualidade e manejo respeitoso.",
    fullDescription:
      "Nosso cuidado estético prioriza o bem-estar do animal com manejo respeitoso, produtos de qualidade e ambiente calmo. Banho, tosa higiênica e da raça, corte de unhas e limpeza auricular deixam seu pet limpo, saudável e cheiroso, além de permitir a detecção precoce de lesões de pele.",
    iconName: "Scissors",
    category: "Estetica",
    badge: "Bem-Estar",
    citableSummary:
      "O banho e tosa da Inuvet oferece banhos terapêuticos, tosa higiênica e cuidados estéticos com produtos de qualidade e equipe treinada em bem-estar animal.",
    commonQuestions: [
      {
        question: "Meu pet é estressado no banho, como vocês lidam?",
        answer: "Utilizamos manejo respeitoso, pausas para descanso e reforço positivo para criar uma experiência mais tranquila e positiva.",
      },
      {
        question: "Filhotes podem tomar banho?",
        answer: "Sim, após a primeira dose das vacinas essenciais, com água morna, secagem rápida e ambiente aquecido.",
      },
    ],
    benefits: [
      "Manejo respeitoso e bem-estar em primeiro lugar",
      "Produtos de qualidade adequados a cada pelagem",
      "Corte de unhas e limpeza auricular inclusos",
      "Detecção precoce de lesões de pele pela equipe",
    ],
  },
];

export const GENERAL_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    category: "Consultas e Urgência",
    question: "A Inuvet atende emergência veterinária 24 horas?",
    answer:
      "Sim. A unidade da Inuvet em Maringá, na Av. Kakogawa, 1244 (Parque das Grevíleas), funciona 24 horas por dia, todos os dias, incluindo madrugadas, feriados e finais de semana, com equipe capacitada e estrutura hospitalar para emergências. A unidade de Sarandi atende de segunda a sábado, das 08:30 às 18:00.",
    citableAnswer:
      "A Inuvet Maringá atende emergências veterinárias 24 horas por dia na Av. Kakogawa, 1244. Contato: (44) 3037-6410 / WhatsApp (44) 99961-0226.",
    keywords: ["veterinario 24 horas maringa", "emergencia veterinaria maringa", "veterinario de plantao maringa", "inuvet"],
  },
  {
    id: "faq-2",
    category: "Consultas e Urgência",
    question: "Como agendar uma consulta ou procedimento na Inuvet?",
    answer:
      "Você pode agendar diretamente pelo nosso site preenchendo o formulário de pré-agendamento online, ligando para (44) 3037-6410 ou enviando uma mensagem para o WhatsApp (44) 99961-0226. Basta informar se prefere ser atendido na unidade de Maringá ou de Sarandi.",
    citableAnswer:
      "O agendamento na Inuvet pode ser feito via WhatsApp (44) 99961-0226, telefone (44) 3037-6410 ou pelo formulário online, escolhendo a unidade de Maringá ou Sarandi.",
    keywords: ["agendar consulta veterinaria maringa", "agendar veterinario sarandi", "whatsapp inuvet"],
  },
  {
    id: "faq-3",
    category: "Consultas e Urgência",
    question: "O que fazer em caso de emergência com meu animal?",
    answer:
      "Se o seu pet apresentar convulsões, dificuldade para respirar, sangramentos, vômito com sangue, suspeita de envenenamento ou atropelamento, entre em contato imediatamente pelo WhatsApp (44) 99961-0226 ou ligue para (44) 3037-6410 e dirija-se à unidade 24h da Inuvet Maringá, na Av. Kakogawa, 1244. Avisar previamente ajuda nossa equipe a preparar o atendimento.",
    citableAnswer:
      "Em emergências, contate o plantão 24h da Inuvet pelo WhatsApp (44) 99961-0226 e vá à Av. Kakogawa, 1244, em Maringá.",
    keywords: ["emergencia veterinaria maringa", "veterinario urgencia sarandi", "hospital veterinario 24h maringa"],
  },
  {
    id: "faq-4",
    category: "Vacinas",
    question: "Quais vacinas meu cachorro precisa tomar e com que frequência?",
    answer:
      "O protocolo vacinal canino essencial inclui a vacina Polivalente (V8 ou V10 - 3 a 4 doses para filhotes a partir de 45 dias com intervalo de 21 a 30 dias) e a Vacina Antirrábica (a partir de 12 semanas). Recomenda-se também a vacina contra a Tosse dos Canis (Gripe) e contra a Giárdia. Cães adultos precisam de reforço anual de todas essas vacinas.",
    citableAnswer:
      "Cães precisam da vacina V8/V10, Antirrábica, Gripe e Giárdia, com doses iniciais aos 45 dias e reforço anual obrigatório.",
    keywords: ["vacinas para cachorro maringa", "vacina v10 sarandi", "vacina de cachorro maringa"],
  },
  {
    id: "faq-5",
    category: "Vacinas",
    question: "Quais vacinas meu gato precisa tomar?",
    answer:
      "Gatos devem tomar a vacina Quádrupla (V4) ou Quíntupla (V5 - que protege contra a leucemia viral felina / FeLV) com 2 a 3 doses a partir de 60 dias de vida, mais a vacina Antirrábica. É fundamental realizar o teste rápido de FIV/FeLV antes da primeira vacina V5. Os reforços devem ser anuais.",
    citableAnswer:
      "Gatos necessitam da vacina Quádrupla (V4) ou Quíntupla (V5) e Antirrábica Felina, com reforço anual após teste de FIV/FeLV.",
    keywords: ["vacinas para gato maringa", "vacina v4 v5 felina sarandi", "vacinacao de gatos"],
  },
  {
    id: "faq-6",
    category: "Cirurgias e Castração",
    question: "Quais os benefícios da castração para cães e gatos?",
    answer:
      "A castração previne quase 100% dos casos de piometra (infecção uterina grave) e reduz em mais de 90% o risco de tumores de mama quando feita antes do primeiro cio. Em machos, previne tumores testiculares e doenças da próstata, além de diminuir fugas, brigas e marcação de território.",
    citableAnswer:
      "A castração previne tumores de mama, piometra, doenças da próstata e reduz fugas em cães e gatos.",
    keywords: ["castracao de cachorro maringa", "castracao de gatos sarandi", "cirurgia veterinaria inuvet"],
  },
  {
    id: "faq-7",
    category: "Cirurgias e Castração",
    question: "Quais exames são necessários antes de uma cirurgia?",
    answer:
      "Para garantir a segurança do procedimento, solicitamos previamente hemograma completo, dosagem de ureia e creatinina (função renal), avaliação da função hepática e, quando indicado, avaliação cardiológica, especialmente em pets idosos.",
    citableAnswer:
      "Exames pré-operatórios na Inuvet incluem hemograma, testes renais e hepáticos, e avaliação cardíaca quando necessário.",
    keywords: ["exames pre operatorios caes", "seguranca cirurgia veterinaria", "castracao segura maringa"],
  },
  {
    id: "faq-8",
    category: "Localização e Pagamento",
    question: "A Inuvet aceita plano de saúde pet? Quais formas de pagamento?",
    answer:
      "A Inuvet faz parte da rede credenciada de planos de saúde pet como Petlove/Pet Life. Além disso, aceitamos pagamento em dinheiro, PIX, cartões de débito e crédito. Consulte nossa equipe sobre a cobertura do seu plano e condições de parcelamento.",
    citableAnswer:
      "A Inuvet integra a rede credenciada Petlove/Pet Life e aceita PIX, dinheiro, cartões de débito e crédito.",
    keywords: ["inuvet plano petlove", "rede credenciada petlove maringa", "formas de pagamento inuvet"],
  },
  {
    id: "faq-9",
    category: "Localização e Pagamento",
    question: "Onde ficam as unidades da Inuvet e quais regiões atendem?",
    answer:
      "A Inuvet possui duas unidades: em Maringá, na Av. Kakogawa, 1244 (Parque das Grevíleas), com atendimento 24h; e em Sarandi, na Av. Brasil, 684 (Jardim Independência II), de segunda a sábado das 08:30 às 18:00. Atendemos toda Maringá, Sarandi, Paiçandu e região metropolitana.",
    citableAnswer:
      "A Inuvet tem unidades em Maringá (Av. Kakogawa, 1244, 24h) e Sarandi (Av. Brasil, 684), atendendo toda a região metropolitana.",
    keywords: ["veterinaria parque das grevileas maringa", "veterinaria av brasil sarandi", "inuvet maringa sarandi"],
  },
  {
    id: "faq-10",
    category: "Geral",
    question: "Por que a Inuvet é referência em Maringá e Sarandi?",
    answer:
      "Porque unimos tecnologia, estrutura hospitalar moderna e cuidado humano em cada atendimento. Com plantão 24 horas em Maringá, equipe experiente preparada para emergências, diagnóstico rápido, duas unidades estratégicas e mais de 500 avaliações positivas, cuidamos do seu pet como se fosse da nossa família.",
    citableAnswer:
      "A Inuvet destaca-se pelo atendimento 24h, estrutura hospitalar moderna, duas unidades (Maringá e Sarandi) e mais de 500 avaliações positivas.",
    keywords: ["melhor clinica veterinaria maringa", "veterinaria 24h sarandi", "hospital veterinario inuvet"],
  },
];

export const TESTIMONIALS_DATA = [
  {
    id: "test-1",
    author: "Mariana Silveira",
    pet: "Tutora do Thor (Golden Retriever)",
    rating: 5,
    text: "O Thor precisou de atendimento de emergência de madrugada e a equipe da Inuvet foi impecável. Saber que existe um veterinário 24h em Maringá me deu total tranquilidade. Ele se recuperou super rápido!",
    date: "Há 2 semanas",
    verified: true,
  },
  {
    id: "test-2",
    author: "Carlos Eduardo Mendes",
    pet: "Tutor da Luna e do Mingau (Gatos)",
    rating: 5,
    text: "Levo meus gatos para vacinação e consultas na unidade de Sarandi. Ambiente limpo, equipe atenciosa e os veterinários explicam cada detalhe com muita paciência. Recomendo demais!",
    date: "Há 1 mês",
    verified: true,
  },
  {
    id: "test-3",
    author: "Fernanda Takahashi",
    pet: "Tutora da Mel (Shih Tzu)",
    rating: 5,
    text: "A Mel fez ultrassom e exames no mesmo dia. A estrutura é moderna e o diagnóstico foi rápido e preciso. O carinho de toda a equipe fez toda a diferença!",
    date: "Há 3 semanas",
    verified: true,
  },
  {
    id: "test-4",
    author: "Roberto Albuquerque",
    pet: "Tutor do Boris (Bulldog Francês)",
    rating: 5,
    text: "Atendimento humano e transparente do início ao fim. O Boris ficou internado com monitoramento e recebi notícias o tempo todo. A Inuvet realmente cuida como se fosse da família.",
    date: "Há 1 mês",
    verified: true,
  },
];
