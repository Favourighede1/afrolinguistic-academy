export interface CulturePost {
  id: string;
  languageId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  imageUrl?: string;
  imageAlt: string;
  publishedAt: string;
  readingMinutes: number;
}

export const culturePosts: CulturePost[] = [
  {
    id: 'culture-1',
    languageId: 'edo',
    title: 'The Ancient Benin Kingdom: A Legacy of Art and Power',
    slug: 'ancient-benin-kingdom-legacy',
    excerpt: 'Discover the rich history of the Benin Kingdom, one of the oldest and most developed states in the coastal hinterland of West Africa.',
    content: `
## The Rise of a Great Kingdom

The Benin Kingdom, also known as the Edo Kingdom, flourished from around the 11th century until it was annexed by the British Empire in 1897. At its peak, it was one of the most advanced civilizations in Africa, renowned for its sophisticated political system, urban planning, and exceptional artwork.

## The Oba: Divine Ruler

The kingdom was ruled by the Oba (king), who was considered semi-divine. The Oba held both political and spiritual authority, and the kingdom's elaborate court ceremonies reflected this dual role. Even today, the Oba of Benin holds an important cultural position among the Edo people.

## Benin Bronzes: Masterpieces of African Art

The kingdom is perhaps most famous for its bronze sculptures, known as the Benin Bronzes. These intricate works of art depicted:
- Royal figures and ceremonies
- Military victories
- Daily life in the palace
- Animals and nature

The technical skill required to create these bronzes rivaled anything produced in Europe at the time.

## The Edo Language Today

The Edo language carries this rich cultural heritage. Many words and phrases reflect the kingdom's history:
- **Oba** - King/Ruler
- **Ẹdó** - The Edo people and their land
- **Ọba na gha tọ ẹse** - May the Oba live long

Learning Edo connects you to this remarkable civilization that continues to influence Nigerian culture today.
    `,
    category: 'History',
    tags: ['history', 'benin kingdom', 'art', 'oba'],
    imageAlt: 'Ancient Benin Kingdom bronze artwork depicting royal figures',
    publishedAt: '2024-01-15',
    readingMinutes: 5
  },
  {
    id: 'culture-2',
    languageId: 'edo',
    title: 'Edo Names: Meanings and Traditions',
    slug: 'edo-names-meanings-traditions',
    excerpt: 'Learn about the beautiful tradition of Edo naming ceremonies and discover the profound meanings behind common Edo names.',
    content: `
## The Significance of Names in Edo Culture

In Edo culture, a name is not just a label—it's a prayer, a prophecy, and a piece of family history. Names often reflect the circumstances of birth, family hopes, or spiritual beliefs.

## Common Edo Names and Their Meanings

### Male Names
- **Osaze** - "God has chosen" - Given to a child believed to be specially selected by God
- **Osagie** - "God has agreed" - Expressing gratitude for answered prayers
- **Ehigie** - "Time/destiny is good" - Celebrating good timing
- **Osakpolor** - "God is the greatest"

### Female Names  
- **Ivie** - "Precious/jewel" - A beloved daughter
- **Osamudiamen** - "God knows my heart" - Trusting in divine understanding
- **Ehi** - "Destiny/time" - Connected to one's life path
- **Osarugue** - "God is my strength"

## The Naming Ceremony

The naming ceremony (traditionally held on the 7th day for girls and 9th day for boys) is a significant family event:

1. The eldest family member whispers the name into the baby's ear
2. Prayers and blessings are offered
3. Water is touched to the baby's lips
4. The name is announced to gathered family and friends
5. Celebration with food and dancing

## Learning Names as Vocabulary

Understanding Edo names helps language learners because:
- Names contain common word roots
- They reveal cultural values
- They provide pronunciation practice with tonal patterns

Try learning the meaning of names when you meet Edo speakers—it's a wonderful conversation starter!
    `,
    category: 'Traditions',
    tags: ['names', 'traditions', 'ceremony', 'culture'],
    imageAlt: 'Traditional Edo naming ceremony celebration',
    publishedAt: '2024-02-10',
    readingMinutes: 6
  },
  {
    id: 'culture-3',
    languageId: 'edo',
    title: 'Traditional Edo Cuisine: Flavors of the Kingdom',
    slug: 'traditional-edo-cuisine-flavors',
    excerpt: 'Explore the delicious world of Edo cooking, from everyday meals to ceremonial feasts that have been enjoyed for centuries.',
    content: `
## A Culinary Heritage

Edo cuisine reflects the kingdom's position as a major trading center and its rich agricultural traditions. The food is known for being flavorful, nutritious, and deeply connected to cultural practices.

## Staple Dishes

### Ẹma (Pounded Yam)
The most important dish in Edo cuisine, ẹma is made by boiling and pounding yam until it becomes smooth and stretchy. It's typically served with:
- **Ọbẹ̀ ata** (pepper soup)
- **Ogbono** (draw soup with ogbono seeds)
- **Ẹdikaikong** (vegetable soup)

### Black Soup (Ọbẹ̀ ọ̀mìsun)
A unique Edo specialty made with local leaves that give it a dark color. It's rich, earthy, and traditionally served during important celebrations.

## Common Food Vocabulary

| Edo | English |
|-----|---------|
| Ẹvbarie | Food |
| Amẹ | Water |
| Ẹma | Pounded yam |
| Eran | Meat |
| Ẹhẹn | Fish |
| Iyan | Yam |
| Ọka | Corn |

## Food in Ceremonies

Food plays a central role in Edo ceremonies:
- **Weddings**: Multiple courses showing the family's prosperity
- **Funerals**: Specific dishes honor the deceased
- **Coronations**: Elaborate feasts lasting several days

## Learning Through Food

One of the best ways to practice Edo is at mealtimes:
- "I hoo amẹ" - I want water
- "Ẹvbarie na wọrọ" - This food is delicious
- "I re ẹma" - I am eating pounded yam

Visit an Edo restaurant or try cooking at home to practice your vocabulary in a meaningful context!
    `,
    category: 'Food & Culture',
    tags: ['food', 'cuisine', 'traditions', 'recipes'],
    imageAlt: 'Traditional Edo dishes including pounded yam and soup',
    publishedAt: '2024-03-05',
    readingMinutes: 5
  }
];

export const getCulturePostsByLanguage = (languageId: string): CulturePost[] => {
  return culturePosts.filter(post => post.languageId === languageId);
};

export const getCulturePostBySlug = (slug: string): CulturePost | undefined => {
  return culturePosts.find(post => post.slug === slug);
};

export const getCulturePostsByCategory = (languageId: string, category: string): CulturePost[] => {
  return culturePosts.filter(post => post.languageId === languageId && post.category === category);
};

export const getCulturePostsByTag = (languageId: string, tag: string): CulturePost[] => {
  return culturePosts.filter(post => post.languageId === languageId && post.tags.includes(tag));
};
