export type VoteResult = {
  option: string
  votes: number
}

export type CategoryResult = {
  title: string
  description: string
  results: VoteResult[]
}

export const results: Record<string, CategoryResult> = {
  melhorTempero: {
    title: 'Temperada do Ano',
    description: 'Qual mina o Ovelha temperou melhor?',
    results: [
      { option: 'Melhoragoraa', votes: 28 },
      { option: 'hdceli', votes: 12 },
      { option: 'Aline fox', votes: 11 },
      { option: 'Bruxinha', votes: 8 },
    ],
  },
  melhorPestinha: {
    title: 'Pestinha do Ano',
    description: 'Quem foi o melhor pestinha da live?',
    results: [
      { option: 'Paraiba', votes: 27 },
      { option: 'Folopa', votes: 16 },
      { option: 'FSoent', votes: 12 },
      { option: 'Carros Rebaixados', votes: 8 },
    ],
  },
  melhorNojo: {
    title: 'Nojeira do Ano',
    description: 'Qual foi a coisa mais nojenta que aconteceu na live em 2024?',
    results: [
      { option: 'Vomito no bong', votes: 26 },
      { option: 'Açaí com Maionese', votes: 15 },
      { option: 'Rasta cozinhando', votes: 10 },
      { option: 'Escarrada na Parede', votes: 1 },
    ],
  },
  melhorHistoria: {
    title: 'História do Ano',
    description: 'Qual melhor história?',
    results: [
      { option: 'A da Buceta Lanterna', votes: 40 },
      { option: 'A da Boneca', votes: 8 },
      { option: 'A da CCTV', votes: 8 },
      { option: 'Punheta diarreia', votes: 3 },
    ],
  },
  melhorSonho: {
    title: 'Sonho Vendido do Ano',
    description: 'Qual sonho vendido do ano?',
    results: [
      { option: 'Cestari largar tudo pra Live', votes: 55 },
      { option: 'CiroTV banido por todos', votes: 4 },
      { option: 'Vitão Voli lives eternas', votes: 1 },
    ],
  },
  melhorApelido: {
    title: 'Apelido do Ano',
    description: 'Qual apelido do rasta para 2024?',
    results: [
      { option: 'MVP', votes: 23 },
      { option: 'Paga Lanches', votes: 20 },
      { option: 'Diddy Mineiro', votes: 11 },
      { option: 'Arame liso', votes: 6 },
    ],
  },
  melhorRage: {
    title: 'Rage do Ano',
    description: 'Qual melhor Rage do ano?',
    results: [
      { option: 'Rage com os pais', votes: 30 },
      { option: 'Futebol no calado', votes: 25 },
      { option: 'Copo quebrado', votes: 6 },
    ],
  },
  melhorPapagaio: {
    title: 'Papagaio do ano',
    description: 'Qual melhor papagaio do ano?',
    results: [
      { option: 'Paraiba', votes: 40 },
      { option: 'Bardo', votes: 8 },
      { option: 'EvosTT', votes: 6 },
      { option: 'Madru', votes: 4 },
    ],
  },
  melhorInimigo: {
    title: 'Inimigo do ano',
    description: 'Qual melhor inimigo do ano?',
    results: [
      { option: 'Surskity', votes: 34 },
      { option: 'Gabriel Scutasu', votes: 21 },
      { option: 'GD-Paulinhax', votes: 3 },
      { option: 'Shady', votes: 2 },
    ],
  },
  melhorLive: {
    title: 'Live do ano',
    description: 'Qual melhor live do ano?',
    results: [
      { option: 'MVP', votes: 27 },
      { option: 'Live do jogo da pedra', votes: 13 },
      { option: 'Live do rainhu', votes: 12 },
      { option: 'Retorno do V name', votes: 9 },
    ],
  },
  melhorSheik: {
    title: 'Sheik do ano',
    description: 'Qual melhor sheik do ano?',
    results: [
      { option: 'LokoGamer', votes: 20 },
      { option: 'Xaim_', votes: 18 },
      { option: 'Criminal', votes: 8 },
      { option: 'Vaas', votes: 8 },
      { option: 'Picanha na chapa', votes: 7 },
    ],
  },
  pioresPapagaio: {
    title: 'Piores papagaios',
    description: 'Qual pior papagaio do ano?',
    results: [
      { option: '710 deals', votes: 23 },
      { option: 'Danielfodase', votes: 16 },
      { option: 'MiguelGoblin', votes: 13 },
      { option: 'Paraiba', votes: 7 },
    ],
  },
  melhorMulher: {
    title: 'Mulher do ano',
    description: 'Qual foi a mulher do ano?',
    results: [
      { option: 'Kikira02', votes: 32 },
      { option: 'Jessika', votes: 17 },
      { option: 'Carol', votes: 13 },
    ],
  },
  melhorMod: {
    title: 'Mod do ano',
    description: 'Qual foi o melhor mod do ano?',
    results: [
      { option: 'Madru', votes: 18 },
      { option: 'XY', votes: 15 },
      { option: 'Calumbr', votes: 12 },
      { option: 'Vinykrugger', votes: 12 },
    ],
  },
  melhorViewer: {
    title: 'Viewer do ano',
    description: 'Qual foi o melhor viewer do ano?',
    results: [
      { option: 'TEMPEROX', votes: 29 },
      { option: 'Temperox', votes: 25 },
      { option: 'tem perox', votes: 3 },
    ],
  },
  melhorPegadinha: {
    title: 'Pegadinha do ano',
    description: 'Qual foi a melhor pegadinha do ano?',
    results: [
      { option: 'Vaza ovelha batendo uma', votes: 25 },
      { option: 'Cestari build da fé', votes: 18 },
      { option: 'Cestari larga emprego para fazer live', votes: 12 },
      { option: 'Cestari tenta logar na conta "cestaricomecoco"', votes: 4 },
    ],
  },
  melhorOperacao: {
    title: 'Operação do ano',
    description: 'Qual foi a melhor operação do ano?',
    results: [
      { option: 'OBM', votes: 30 },
      { option: 'Porco no espeto', votes: 22 },
      { option: 'Show de Truman', votes: 8 },
    ],
  },
  melhorAcontecimento: {
    title: 'Acontecimento em live do ano',
    description: 'Qual foi o melhor acontecimento em live do ano?',
    results: [
      { option: 'Descoberta do twitter do raiunhu', votes: 28 },
      { option: 'Call vazada do ovelha', votes: 23 },
      {
        option: 'Ovelha falando o que pensa sobre sionistas e afins',
        votes: 6,
      },
      { option: 'Racing campeão em cima das marias', votes: 2 },
    ],
  },
  melhorArtista: {
    title: 'Artista do ano',
    description: 'Qual foi o melhor artista do ano?',
    results: [
      { option: 'Rasta Records', votes: 34 },
      { option: 'BabyKenan', votes: 12 },
      { option: 'Calumbr', votes: 7 },
      { option: 'Charlieofofo', votes: 6 },
    ],
  },
  melhorAquisição: {
    title: 'Aquisição do ano',
    description: 'Qual foi a melhor aquisição do ano?',
    results: [
      { option: 'Lanterna ciborgue', votes: 43 },
      { option: 'Placa de vídeo', votes: 9 },
      { option: 'Câmera pra vizinha', votes: 7 },
      { option: 'Bong em formato de pinto', votes: 1 },
    ],
  },
  melhorCorteDeCabelo: {
    title: 'Melhor Corte de Cabelo',
    description: 'Qual foi o melhor corte de cabelo do ano?',
    results: [
      { option: 'Bigorna', votes: 37 },
      { option: 'Abacaxi', votes: 17 },
      { option: 'Chocalho', votes: 6 },
    ],
  },
  melhorCamisa: {
    title: 'Melhor Camisa',
    description: 'Qual foi a melhor camisa do ano?',
    results: [
      { option: 'Camisa do jacomé', votes: 30 },
      { option: 'Camisa rasta roxa clássica', votes: 16 },
      { option: 'Camisa da blasfêmia', votes: 13 },
    ],
  },
  melhorFoto: {
    title: 'Melhor Foto',
    description: 'Qual foi a melhor foto do ano?',
    results: [
      { option: 'MVP mostrando a Msol', votes: 21 },
      { option: 'Tentando beijar a Carol', votes: 21 },
      { option: 'Crânio Rastafari', votes: 7 },
      { option: 'Iai pai', votes: 7 },
    ],
  },
  melhorEsculacho: {
    title: 'Melhor Esculacho',
    description: 'Qual foi o melhor esculacho do ano?',
    results: [
      { option: 'Esse cara é virgem, é? - Toguro', votes: 31 },
      { option: 'O maior esculacho do ovelhera no CyberPunk', votes: 15 },
      { option: 'Esculacho de 15 minutos no Battlebit', votes: 7 },
      { option: 'Esculacho no F1 2024', votes: 7 },
    ],
  },
  melhorClipe: {
    title: 'Melhor Clipe',
    description: 'Qual foi o melhor clipe do ano?',
    results: [
      { option: 'Iai Pai + Bongada', votes: 28 },
      { option: 'Tentando beijar a Carol', votes: 25 },
      { option: 'Perdendo o BV', votes: 3 },
      { option: 'Esculacho da BGS', votes: 2 },
    ],
  },
  melhorMusica: {
    title: 'Melhor Música',
    description: 'Qual foi a melhor música do ano?',
    results: [
      { option: 'Ritmanso - Carros Rebaixados', votes: 26 },
      { option: 'Manson Manson - Rasta Records', votes: 18 },
      { option: 'Medley Rastafari - BABYKENAN', votes: 14 },
      { option: 'Porta Aberta - Charlieofofo', votes: 2 },
    ],
  },
}
