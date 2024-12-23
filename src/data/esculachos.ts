export type EsculachosType = {
  autor?: string
  was_live?: boolean
  momento_do_esculacho?: string
  contexto?: string
  id: number
  texto: string
  selectedVoice?: SpeechSynthesisVoice
}

export const esculachos: EsculachosType[] = [
  {
    id: 1,
    autor: 'Rasta Records',
    was_live: false,
    momento_do_esculacho: '23/12/2024',
    contexto: 'Rasta Records ficou puto porque o ovelha não apareceu no evento',
    texto:
      'Eai Ovelhera, não vai justificar teu sumiço de ontem não? O que você é sem a gente? Sua sorte é eu gostar daqui. Continua assim! Um dia eu canso e mudo meu nome pra Rosado Records, ou Cestari Records, ou Tirano Records, Phasiot Records. O que você faria, em? Sua sorte, Zé, é que não existe uma comunidade tão dedicada como essa, mas eu fiquei triste pelos amigos que fizeram tanto ontem e você não veio dar um salve pra eles. Um bom dia, uma boa tarde e uma boa noite pra você, seu merda!',
  },
  {
    id: 2,
    autor: 'FSoent',
    momento_do_esculacho: '',
    was_live: false,
    contexto: 'FSoent manda a real sobre a vida do Ovelhera',
    texto:
      'FSoent fortaleceu o sonho com um real e mandou o papo. Olha só, eu algum dia vou ficar milionário para comprar a Twitch só para mim e fechar essa plataforma de vez, para você não ter mais do que viver. Ser expulso de casa, para depois eu te ver sentado em cima de um papelão em alguma pracinha desse Mossoró que você vive e chama de lugar.\n\n' +
      'Eu, logo após te fazer virar mendigo, vou fazer questão de ir até você e vou comer um açaí sentado bem do seu lado no papelão em campo. Você vai ficar babando, cheio de fome, olhando eu comer. E enquanto eu como, eu ainda vou ficar dando risada.\n\n' +
      'Como se não fosse suficiente, de noite eu ia esperar você dormir e ia mijar no seu papelão. E você ia ter que amanhecer no meu mijo. Tudo isso é para você aprender a virar homem. Depois, no próximo dia, eu ia chegar com um Camaro cheio de mulheres e ia estacionar o carro bem na sua frente para você ter uma crise existencial.\n\n' +
      'Sua putinha nojenta. Isso é o que você merece, seu porco do caralho. E depois, no próximo dia, eu iria construir um condomínio ao redor da pracinha onde você mora no papelão e vou construir bastantes casas de luxo para várias pessoas ricas morarem lá, passarem perto do seu fedor e te expulsarem.\n\n' +
      'Eu quero muito isso, eu quero que você vire um andarilho, vai ficar sem comer a ponto de pesar cinquenta quilos, andando o dia inteiro sem saber o que fazer da vida. Só de imaginar isso eu já começo a abrir um sorrisão no meu rosto.\n\n' +
      'Nossa, que delícia de se imaginar. Eu espero que você absorva isso. Essa possível realidade, porque ela de fato vai acontecer.',
  },
  {
    id: 3,
    autor: 'FSoent',
    was_live: false,
    momento_do_esculacho: '',
    contexto: 'FSoent manda a real sobre a vida do Ovelhera',
    texto:
      'Sua vida parece um episódio de Black Mirror onde o chat é uma plateia assistindo a um fracassado apodrecendo a cada dia na cadeira. Sua vida deve ser uma simulação, sério mesmo? Você foi feito para sofrer, para ser esculachado.\n\n' +
      'E a maior prova disso é que você literalmente vive disso. Quer saber? Tem mais. Um dos maiores picos de felicidade do ser humano é durante um relacionamento. Agora me responde, com quem você vai namorar?\n\n' +
      'Você é obeso, pobre, viciado em droga, sem futuro algum morando com os pais. Para você conseguir namorar alguém nesse estado, ou você tranca mulher no porão ou você faz pacto com o diabo. É que você não é feio, você é horroroso, um monstro de ruindade. Você acha que a gente não nota? Quando você fecha a live dizendo que vai descansar mas quando na verdade você fecha pra ir bater punheta?\n\n' +
      'Tem mais um tópico para ressaltar: você nunca vai casar sendo um streamer. Porque qualquer mina que entrar na sua vida, a gente vai fazer da vida dela um inferno, e é aí que entra o episódio de Black Mirror - nós, seus meros telespectadores, temos a missão de não deixar você sentir nenhum tipo de felicidade externa.\n\n' +
      'Você está restrito a sorrir apenas a vídeos do YouTube, modo arena. Isso é o que você pode sorrir. Quero te ver mofando nessa cadeira pra sempre. Não vejo a hora de eu daqui a 10 anos ter minha esposa no Canadá.\n\n' +
      'Eu sentado no Alasca com minha caneca de café e meu roupão banhado a ouro. Vendo você com uma barba falhada fedendo a Cheetos e olhando a tela do computador. Jogando LoL na season 20.\n\n' +
      'Vai ser tão legal que eu até me arrepio. Sério mesmo? Cara, você é o pico do fracasso humano, parabéns. Sabe uma prova de que você aos poucos está virando uma putinha marionete nossa? Que você escutou essa mensagem até aqui - anos atrás você já teria skipado... você é submisso.',
  },
  {
    id: 4,
    autor: 'XY',
    was_live: false,
    momento_do_esculacho: '',
    contexto: 'XY manda a real sobre a vida do Ovelhera',
    texto:
      'XY fortaleceu o sonho com 1 real e mandou o papo. Boa noite, Gabriel. Tudo bom? Esse ano voou, né? O que você fez de diferente do ano passado? Quais foram suas conquistas? emagreceu? começou a fazer academia? aprendeu um idioma novo? parou de usar drogas? se relacionou com alguém sem precisar pagar? Não, né? Se uma pessoa que assistia a sua live em 2022 entrou em coma e acordou hoje, provavelmente ele não iria notar diferença alguma na sua live.\n\n' +
      'Aliás, ele ia notar que piorou muito. A cada dia que passa esse buraco que você cavou está mais fundo e você não faz nada para mudar. Pelo contrário, percebo que seus vícios estão cada dia mais agressivos.\n\n' +
      'Está cada dia mais difícil fugir da realidade, né, dog? Quando você está sóbrio, começa a ouvir as vozes da realidade na sua cabeça, mas você não quer ouvir, né? Você precisa estar a todo momento entorpecido para continuar conseguindo sobreviver, né?\n\n' +
      'Porque essa vida que você leva não é viver é sobreviver. Você é escravo dos seus vícios. Você não tem controle nenhum sobre sua vida. Você só continua fazendo live para continuar alimentando essa carcaça viciada que tomou conta do seu ser.\n\n' +
      'Você parece uma pessoa oca, não tem nada dentro de você. Apenas anseio dos vícios. Quando você vai mudar, hein? Ainda da tempo, quando você vai dar orgulho para os seus pais? Infelizmente, nossos pais não vão viver para sempre.\n\n' +
      'Você nunca vai mudar de vida. Você não pensa em constituir uma família. Você acha mesmo que essa vida que você leva irá te dar algum futuro? Sua vida é buscar prazer momentâneo. Sua vida é um lixo. Enfim, quais são seus planos para 2025?\n\n' +
      '2024 já foi, né, pai? A mudança tem que começar dia primeiro de janeiro, né, pai? Sou seu fã. Manda salve.',
  },
]
