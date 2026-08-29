export type HistoryMode = 'real' | 'alternative'

export type HistorySource = {
  label: string
  url: string
}

export type HistoryEvent = {
  id: string
  year: number
  yearLabel: string
  title: string
  description: string
  mediaLabel: string
  sources: HistorySource[]
  revealAt: number
}

export const realHistoryEvents: HistoryEvent[] = [
  {
    id: 'declaration',
    year: 1776,
    yearLabel: '1776',
    title: 'The Declaration of Independence',
    description:
      'Delegates adopted the Declaration of Independence, announcing that the thirteen colonies regarded themselves as sovereign states independent of Great Britain.',
    mediaLabel: 'Founding document',
    sources: [
      {
        label: 'National Archives: Declaration transcript',
        url: 'https://www.archives.gov/founding-docs/declaration-transcript',
      },
    ],
    revealAt: 1,
  },
  {
    id: 'constitution',
    year: 1787,
    yearLabel: '1787',
    title: 'The Constitution Is Signed',
    description:
      'Thirty-nine delegates signed the United States Constitution in Philadelphia, establishing the framework of the federal government.',
    mediaLabel: 'Constitution manuscript',
    sources: [
      {
        label: 'National Archives: Constitution transcript',
        url: 'https://www.archives.gov/founding-docs/constitution-transcript',
      },
    ],
    revealAt: 1.45,
  },
  {
    id: 'louisiana-purchase',
    year: 1803,
    yearLabel: '1803',
    title: 'The Louisiana Purchase',
    description:
      'The United States purchased roughly 828,000 square miles from France, nearly doubling the nation’s claimed territory.',
    mediaLabel: 'Territorial map',
    sources: [
      {
        label: 'National Archives: Louisiana Purchase Treaty',
        url: 'https://www.archives.gov/milestone-documents/louisiana-purchase-treaty',
      },
    ],
    revealAt: 2.2,
  },
  {
    id: 'emancipation',
    year: 1863,
    yearLabel: '1863',
    title: 'The Emancipation Proclamation',
    description:
      'President Abraham Lincoln declared enslaved people in areas still in rebellion to be free, transforming the legal and moral stakes of the Civil War.',
    mediaLabel: 'Presidential proclamation',
    sources: [
      {
        label: 'National Archives: Emancipation Proclamation',
        url: 'https://www.archives.gov/exhibits/featured-documents/emancipation-proclamation',
      },
    ],
    revealAt: 1,
  },
  {
    id: 'transcontinental-railroad',
    year: 1869,
    yearLabel: '1869',
    title: 'The Rails Meet at Promontory',
    description:
      'The Union Pacific and Central Pacific railroads were joined in Utah, creating the first transcontinental railroad connection.',
    mediaLabel: 'Historic photograph',
    sources: [
      {
        label: 'National Park Service: Golden Spike',
        url: 'https://www.nps.gov/gosp/learn/historyculture/index.htm',
      },
    ],
    revealAt: 3.3,
  },
  {
    id: 'nineteenth-amendment',
    year: 1920,
    yearLabel: '1920',
    title: 'The Nineteenth Amendment',
    description:
      'The Constitution prohibited denying the right to vote on the basis of sex, a landmark victory after generations of organizing.',
    mediaLabel: 'Ratified amendment',
    sources: [
      {
        label: 'National Archives: 19th Amendment',
        url: 'https://www.archives.gov/milestone-documents/19th-amendment',
      },
    ],
    revealAt: 1.45,
  },
  {
    id: 'pearl-harbor',
    year: 1941,
    yearLabel: '1941',
    title: 'The United States Enters World War II',
    description:
      'After the attack on Pearl Harbor, Congress declared war on Japan, formally bringing the United States into World War II.',
    mediaLabel: 'Congressional address',
    sources: [
      {
        label: 'National Archives: Declaration of War',
        url: 'https://www.archives.gov/milestone-documents/joint-address-to-congress-declaration-of-war-against-japan',
      },
    ],
    revealAt: 1,
  },
  {
    id: 'apollo-11',
    year: 1969,
    yearLabel: '1969',
    title: 'Apollo 11 Lands on the Moon',
    description:
      'Neil Armstrong and Buzz Aldrin became the first people to walk on the Moon while Michael Collins remained in lunar orbit.',
    mediaLabel: 'Lunar mission photography',
    sources: [
      {
        label: 'NASA: Apollo 11 Mission Overview',
        url: 'https://www.nasa.gov/history/apollo-11-mission-overview/',
      },
    ],
    revealAt: 1,
  },
  {
    id: 'september-11',
    year: 2001,
    yearLabel: '2001',
    title: 'The September 11 Attacks',
    description:
      'Coordinated terrorist attacks killed nearly 3,000 people and reshaped American foreign policy, national security, and public life.',
    mediaLabel: 'Commission archive',
    sources: [
      {
        label: 'The 9/11 Commission Report',
        url: 'https://www.9-11commission.gov/report/',
      },
    ],
    revealAt: 1,
  },
]

export const alternativeHistoryEvents: HistoryEvent[] = [
  {
    id: 'reconciliation-compact',
    year: 1776,
    yearLabel: '1776',
    title: 'The Reconciliation Compact',
    description:
      'In this fictional timeline, Parliament accepts a last-minute autonomy compact and the colonies become a self-governing American federation within the British Empire.',
    mediaLabel: 'Imagined treaty draft',
    sources: [
      {
        label: 'Historical basis: Olive Branch Petition',
        url: 'https://www.archives.gov/milestone-documents/petition-to-king-george-iii',
      },
    ],
    revealAt: 1,
  },
  {
    id: 'hamilton-survives',
    year: 1804,
    yearLabel: '1804',
    title: 'Hamilton Survives the Duel',
    description:
      'Alexander Hamilton survives his encounter with Aaron Burr and returns to public life, organizing a durable national opposition to states’ rights politics.',
    mediaLabel: 'Counterfactual broadside',
    sources: [
      {
        label: 'Historical basis: Hamilton–Burr Duel',
        url: 'https://www.nps.gov/articles/000/hamilton-burr-duel.htm',
      },
    ],
    revealAt: 1.45,
  },
  {
    id: 'peace-of-1861',
    year: 1861,
    yearLabel: '1861–1868',
    title: 'The Long Emancipation Settlement',
    description:
      'A constitutional compromise prevents immediate civil war but creates a federally funded, seven-year emancipation program followed by a prolonged struggle over citizenship.',
    mediaLabel: 'Imagined amendment',
    sources: [
      {
        label: 'Historical basis: Crittenden Compromise',
        url: 'https://www.senate.gov/artandhistory/history/minute/Crittenden_Compromise.htm',
      },
    ],
    revealAt: 1,
  },
  {
    id: 'roosevelt-1912',
    year: 1912,
    yearLabel: '1912',
    title: 'Roosevelt Returns to the White House',
    description:
      'Theodore Roosevelt’s Progressive Party wins enough states to secure the presidency, accelerating labor protections and federal conservation programs.',
    mediaLabel: 'Imagined election map',
    sources: [
      {
        label: 'Historical basis: Election of 1912',
        url: 'https://www.loc.gov/classroom-materials/elections/theodore-roosevelt/',
      },
    ],
    revealAt: 1.45,
  },
  {
    id: 'delayed-surrender',
    year: 1945,
    yearLabel: '1945–1946',
    title: 'The Pacific War Continues',
    description:
      'Japan does not surrender in August 1945. A blockade and continued conventional bombing extend the war into 1946, altering postwar alliances across Asia.',
    mediaLabel: 'Alternate campaign map',
    sources: [
      {
        label: 'Historical basis: Japan’s Surrender',
        url: 'https://www.archives.gov/milestone-documents/surrender-of-japan',
      },
    ],
    revealAt: 1,
  },
  {
    id: 'kennedy-survives',
    year: 1963,
    yearLabel: '1963',
    title: 'Kennedy Survives Dallas',
    description:
      'The motorcade route changes after a security warning. President Kennedy survives, and the 1964 election becomes a referendum on civil rights and Vietnam.',
    mediaLabel: 'Imagined newspaper front page',
    sources: [
      {
        label: 'Historical basis: Warren Commission',
        url: 'https://www.archives.gov/research/jfk/warren-commission-report',
      },
    ],
    revealAt: 2.2,
  },
  {
    id: 'permanent-moon-base',
    year: 1969,
    yearLabel: '1969–1982',
    title: 'Congress Approves a Permanent Moon Base',
    description:
      'Apollo 11’s success leads to sustained bipartisan funding. By 1982, an international research station operates near the lunar south pole.',
    mediaLabel: 'Imagined lunar base concept',
    sources: [
      {
        label: 'Historical basis: Apollo 11',
        url: 'https://www.nasa.gov/history/apollo-11-mission-overview/',
      },
    ],
    revealAt: 1,
  },
  {
    id: 'electoral-reform',
    year: 2000,
    yearLabel: '2000–2004',
    title: 'A National Popular Vote Amendment',
    description:
      'The disputed presidential election produces a constitutional amendment replacing the Electoral College with a national popular vote before the next election.',
    mediaLabel: 'Imagined amendment text',
    sources: [
      {
        label: 'Historical basis: Bush v. Gore',
        url: 'https://www.oyez.org/cases/2000/00-949',
      },
    ],
    revealAt: 1,
  },
]

export const historyEvents: Record<HistoryMode, HistoryEvent[]> = {
  real: realHistoryEvents,
  alternative: alternativeHistoryEvents,
}
