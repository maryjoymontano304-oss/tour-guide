export interface StoryStep {
  number: string;
  label: string;
  text: string;
}

export interface KeywordItem {
  number: string;
  word: string;
  cue: string;
}

export interface QuizItem {
  id: string;
  question: string;
  answer: string;
}

export interface LocationEntry {
  id: string;
  cardTitle: string;
  fullTitle: string;
  imageLabel: string;
  hasVerifiedContent: boolean;
  facts: string[];
  storySteps: StoryStep[];
  keywords: KeywordItem[];
  quiz: QuizItem[];
  sourceUrl?: string;
  sourceLabel?: string;
  sourceMissingNote?: string;
  partialNote?: string;
  defaultImageUrl?: string;
  galleryImages?: string[];
  addressLabel?: string;
  emptyStatusLabel?: string;
  emptyStatusMessage?: string;
}

export const LABUAN_LOCATIONS: LocationEntry[] = [
  {
    id: 'dataran-labuan',
    cardTitle: 'Dataran Labuan',
    fullTitle: 'Dataran Labuan',
    imageLabel: 'Ruang Gambar: Dataran Labuan',
    hasVerifiedContent: false,
    facts: [],
    storySteps: [],
    keywords: [],
    quiz: [],
  },
  {
    id: 'muzium-marin',
    cardTitle: 'Muzium Marin',
    fullTitle: 'Muzium Marin Labuan',
    imageLabel: 'Ruang Gambar: Muzium Marin Labuan',
    hasVerifiedContent: true,
    facts: [
      'Muzium ini memfokuskan pameran hidupan marin.',
      'Antara objektifnya ialah memberi pengetahuan tentang hidupan marin di perairan Borneo, khususnya Labuan.',
      'Muzium ini memupuk kesedaran untuk menjaga warisan semula jadi.',
      'Menurut Jabatan Muzium Malaysia (JMM), rangka paus yang dipamerkan ditemui di Pantai Sebatu, Melaka.',
    ],
    storySteps: [
      {
        number: '01',
        label: 'Tarikan Pembuka',
        text: 'Bayangkan kita berdiri di hadapan rangka seekor paus sebenar — tetapi kisah penemuannya bermula dari pantai di Melaka sebelum menjadi tumpuan di pulau Labuan.',
      },
      {
        number: '02',
        label: 'Fakta Disahkan',
        text: 'Muzium Marin Labuan memfokuskan pameran hidupan marin untuk memberi pengetahuan tentang hidupan laut perairan Borneo, khususnya Labuan. Menurut JMM, rangka paus yang dipamerkan di sini ditemui di Pantai Sebatu, Melaka.',
      },
      {
        number: '03',
        label: 'Makna Tempat',
        text: 'Muzium ini berperanan memupuk kesedaran masyarakat tentang pentingnya menghargai dan menjaga warisan semula jadi lautan kita.',
      },
      {
        number: '04',
        label: 'Hubungan dengan Pelawat',
        text: 'Setiap pelawat yang datang bukan sahaja dapat mengenali kekayaan hidupan marin Borneo, malah turut diingatkan tentang tanggungjawab bersama memelihara alam laut.',
      },
      {
        number: '05',
        label: 'Soalan atau Ajakan',
        text: 'Sebelum kita masuk meneroka ruang pameran, apakah satu langkah kecil yang boleh kita amalkan untuk menjaga warisan semula jadi laut hari ini?',
      },
    ],
    keywords: [
      {
        number: '01',
        word: 'Hidupan Marin',
        cue: 'Fokus utama pameran muzium',
      },
      {
        number: '02',
        word: 'Perairan Borneo & Labuan',
        cue: 'Tumpuan pengetahuan hidupan laut',
      },
      {
        number: '03',
        word: 'Warisan Semula Jadi',
        cue: 'Kesedaran pemeliharaan yang dipupuk',
      },
      {
        number: '04',
        word: 'Rangka Paus',
        cue: 'Bahan pameran disahkan oleh JMM',
      },
      {
        number: '05',
        word: 'Pantai Sebatu, Melaka',
        cue: 'Tempat penemuan rangka paus',
      },
    ],
    quiz: [
      {
        id: 'kuiz-1',
        question:
          'Menurut Jabatan Muzium Malaysia (JMM), di manakah rangka paus yang dipamerkan di Muzium Marin Labuan ditemui?',
        answer: 'Di Pantai Sebatu, Melaka.',
      },
      {
        id: 'kuiz-2',
        question:
          'Apakah objektif utama Muzium Marin Labuan berkaitan perairan Borneo dan masyarakat?',
        answer:
          'Memberi pengetahuan tentang hidupan marin perairan Borneo (khususnya Labuan) serta memupuk kesedaran menjaga warisan semula jadi.',
      },
    ],
    sourceUrl: 'https://www.jmm.gov.my/en/content/labuan-marine-museum',
    sourceLabel: 'Jabatan Muzium Malaysia (JMM) — Labuan Marine Museum',
  },
  {
    id: 'tanjung-batu',
    cardTitle: 'Tanjung Batu',
    fullTitle: 'Tanjung Batu',
    imageLabel: 'Ruang Gambar: Tanjung Batu',
    hasVerifiedContent: false,
    facts: [],
    storySteps: [],
    keywords: [],
    quiz: [],
  },
  {
    id: 'tugu-peringatan-perang',
    cardTitle: 'Tugu Peringatan Perang',
    fullTitle: 'Tugu Peringatan Perang Dunia Kedua Labuan',
    addressLabel: 'Jalan Pahlawan, Labuan, Malaysia',
    imageLabel: 'Ruang Gambar: Tugu Peringatan Perang',
    defaultImageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-14_at_1.37.22_PM_7fb39f79.jpeg',
    galleryImages: [
      '/assets/aistudio/WhatsApp_Image_2026-11-14_at_1.37.22_PM_7fb39f79.jpeg',
      '/assets/aistudio/WhatsApp_Image_2026-11-14_at_1.37.24_PM_9334c2ff.jpeg',
      '/assets/aistudio/WhatsApp_Image_2026-11-14_at_1.45.24_PM_81a8b550.jpeg',
      '/assets/aistudio/WhatsApp_Image_2026-11-14_at_1.37.21_PM_a6486ad8.jpeg',
    ],
    hasVerifiedContent: true,
    partialNote:
      'Maklumat tidak mencukupi untuk sejarah penuh lokasi ini (pautan sumber dan teks bahan sejarah masih belum dibekalkan). Fakta, cerita, kata kunci dan kuiz di bawah disusun hanya daripada lokasi Jalan Pahlawan serta 4 gambar yang dibekalkan.',
    facts: [
      'Terletak di Jalan Pahlawan, Labuan, Malaysia.',
      'Terdapat monumen salib batu berpedang gangsa dengan kalungan bunga penghormatan di tapak bertingkatnya (Foto 1).',
      'Terdapat tugu batu bertanda tahun 1939 – 1945 dengan lambang bintang lima bucu dan plak peringatan di bahagian hadapan (Foto 2).',
      'Pada dinding bata merah terdapat pintu peti gangsa bertulis “CEMETERY AND MEMORIAL REGISTER” (Foto 3).',
      'Satu plak gangsa mencatat penghormatan kepada anggota Tentera India beragama Hindu: 40336 Sapper Pandurang Marunkar daripada Royal Bombay Sappers & Miners, bertarikh 11 October 1945 (Foto 4).',
      'Maklumat tidak mencukupi: Sejarah penubuhan, jumlah keseluruhan anggota yang diperingati, nama pihak pengelola, dan teks inskripsi penuh pada tugu utama belum dibekalkan.',
    ],
    storySteps: [
      {
        number: '01',
        label: 'Tarikan Pembuka',
        text: 'Di hadapan kita berdiri tugu batu bertanda tahun 1939 hingga 1945 serta salib batu berpedang gangsa dengan kalungan bunga — tanda bahawa kawasan ini memelihara ingatan sejarah perang.',
      },
      {
        number: '02',
        label: 'Fakta Disahkan',
        text: 'Tapak peringatan di Jalan Pahlawan, Labuan, Malaysia ini mempunyai peti gangsa “Cemetery and Memorial Register” pada dinding bata serta plak anggota Indian Army, 40336 Sapper Pandurang Marunkar dari Royal Bombay Sappers & Miners bertarikh 11 Oktober 1945. (Catatan: Latar belakang sejarah terperinci dan pautan sumber masih belum mencukupi).',
      },
      {
        number: '03',
        label: 'Makna Tempat',
        text: 'Kalungan bunga pada tapak salib batu dan plak penghormatan menunjukkan tempat ini menjadi ruang mengenang serta menghormati anggota tentera yang terkorban.',
      },
      {
        number: '04',
        label: 'Hubungan dengan Pelawat',
        text: 'Apabila pelawat membaca nama seperti Sapper Pandurang Marunkar serta tulisan pada Memorial Register, kita melihat bahawa sejarah perang melibatkan insan sebenar daripada pelbagai latar belakang dan kepercayaan.',
      },
      {
        number: '05',
        label: 'Soalan atau Ajakan',
        text: 'Sambil kita meninjau tugu dan peti daftar peringatan di sini, apakah satu perincian pada monumen atau plak yang paling menarik perhatian anda untuk dihargai bersama?',
      },
    ],
    keywords: [
      {
        number: '01',
        word: '1939 – 1945',
        cue: 'Tahun terukir pada tugu batu',
      },
      {
        number: '02',
        word: 'Salib & Pedang Gangsa',
        cue: 'Monumen utama dengan kalungan bunga',
      },
      {
        number: '03',
        word: 'Memorial Register',
        cue: 'Peti gangsa Cemetery and Memorial Register',
      },
      {
        number: '04',
        word: 'Sapper Pandurang Marunkar',
        cue: '40336 · Royal Bombay Sappers & Miners',
      },
      {
        number: '05',
        word: '11 Oktober 1945',
        cue: 'Tarikh tercatat pada plak Indian Army',
      },
    ],
    quiz: [
      {
        id: 'tugu-kuiz-1',
        question:
          'Apakah tempoh tahun yang terukir pada bahagian atas tugu batu yang mempunyai lambang bintang lima bucu (Foto 2)?',
        answer: '1939 – 1945.',
      },
      {
        id: 'tugu-kuiz-2',
        question:
          'Apakah perkataan yang tertera pada pintu peti gangsa di dinding bata merah (Foto 3)?',
        answer: 'CEMETERY AND MEMORIAL REGISTER.',
      },
      {
        id: 'tugu-kuiz-3',
        question:
          'Berdasarkan plak gangsa pada Foto 4, siapakah nama anggota, unit pasukan, dan tarikh yang tercatat?',
        answer:
          '40336 Sapper Pandurang Marunkar, daripada Royal Bombay Sappers & Miners (Indian Army), bertarikh 11 October 1945.',
      },
    ],
    sourceMissingNote:
      'Maklumat tidak mencukupi — pautan sumber dan teks bahan disemak belum dibekalkan ([TAMPAL BAHAN DI SINI] kosong). Sumber semasa hanya berdasarkan 4 foto lokasi yang dimuat naik.',
  },
];
