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
    momento_do_esculacho: 'https://www.youtube.com/watch?v=owrR3MVRHAM',
    was_live: true,
    contexto: 'bosta',
    texto:
      'FSoent fortaleceu o sonho com um real e mandou o papo. Olha só, eu algum dia vou ficar milionário para comprar a Twitch só para mim e fechar essa plataforma de vez, para você não ter mais do que viver. Ser expulso de casa, para depois eu te ver sentado em cima de um papelão em alguma pracinha desse Mossoró que você vive e chama de lugar.\n\n' +
      'Eu, logo após te fazer virar mendigo, vou fazer questão de ir até você e vou comer um açaí sentado bem do seu lado no papelão em campo. Você vai ficar babando, cheio de fome, olhando eu comer. E enquanto eu como, eu ainda vou ficar dando risada.\n\n' +
      'Como se não fosse suficiente, de noite eu ia esperar você dormir e ia mijar no seu papelão. E você ia ter que amanhecer no meu mijo. Tudo isso é para você aprender a virar homem. Depois, no próximo dia, eu ia chegar com um Camaro cheio de mulheres e ia estacionar o carro bem na sua frente para você ter uma crise existencial.\n\n' +
      'Sua putinha nojenta. Isso é o que você merece, seu porco do caralho. E depois, no próximo dia, eu iria construir um condomínio ao redor da pracinha onde você mora no papelão e vou construir bastantes casas de luxo para várias pessoas ricas morarem lá, passarem perto do seu fedor e te expulsarem.\n\n' +
      'Eu quero muito isso, eu quero que você vire um andarilho, vai ficar sem comer a ponto de pesar cinquenta quilos, andando o dia inteiro sem saber o que fazer da vida. Só de imaginar isso eu já começo a abrir um sorrisão no meu rosto.\n\n' +
      'Nossa, que delícia de se imaginar. Eu espero que você absorva isso. Essa possível realidade, porque ela de fato vai acontecer.',
  },
]
