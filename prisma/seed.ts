import { PrismaClient, PriceRange } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.reviewLike.deleteMany();
  await prisma.report.deleteMany();
  await prisma.listItem.deleteMany();
  await prisma.list.deleteMany();
  await prisma.reviewTag.deleteMany();
  await prisma.restaurantTag.deleteMany();
  await prisma.cuisineTag.deleteMany();
  await prisma.review.deleteMany();
  await prisma.wantToTry.deleteMany();
  await prisma.photo.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.user.deleteMany();

  const users = await prisma.user.createMany({
    data: [
      {
        email: 'claire@tasteboxd.fr',
        passwordHash: 'hashed-password',
        displayName: 'Claire A.',
        username: 'claire',
        bio: 'Toujours en quête du meilleur brunch.',
        city: 'Paris'
      },
      {
        email: 'mehdi@tasteboxd.fr',
        passwordHash: 'hashed-password',
        displayName: 'Mehdi R.',
        username: 'mehdi',
        bio: 'Team ramen et street food.',
        city: 'Paris'
      },
      {
        email: 'ines@tasteboxd.fr',
        passwordHash: 'hashed-password',
        displayName: 'Inès T.',
        username: 'ines',
        bio: 'Découvre les meilleurs spots veggie.',
        city: 'Paris'
      }
    ]
  });

  const restaurantData = [
    {
      name: 'Bistrot Lumière',
      slug: 'bistrot-lumiere',
      addressLine1: '12 Rue des Martyrs',
      city: 'Paris',
      lat: 48.8821,
      lng: 2.3372,
      cuisine: 'Bistronomie',
      priceRange: PriceRange.EURO_EURO,
      phone: '+33100000000'
    },
    {
      name: 'Ramen Kōen',
      slug: 'ramen-koen',
      addressLine1: '5 Rue Sainte-Anne',
      city: 'Paris',
      lat: 48.8661,
      lng: 2.3356,
      cuisine: 'Japonais',
      priceRange: PriceRange.EURO
    },
    {
      name: 'Maison Olive',
      slug: 'maison-olive',
      addressLine1: '22 Quai de Jemmapes',
      city: 'Paris',
      lat: 48.8722,
      lng: 2.3647,
      cuisine: 'Méditerranéen',
      priceRange: PriceRange.EURO_EURO_EURO
    },
    {
      name: 'Café Arôme',
      slug: 'cafe-arome',
      addressLine1: '3 Rue Oberkampf',
      city: 'Paris',
      lat: 48.8648,
      lng: 2.3771,
      cuisine: 'Brunch',
      priceRange: PriceRange.EURO
    },
    {
      name: 'Le Marais Vert',
      slug: 'le-marais-vert',
      addressLine1: '9 Rue de Turenne',
      city: 'Paris',
      lat: 48.8574,
      lng: 2.364,
      cuisine: 'Végétarien',
      priceRange: PriceRange.EURO_EURO
    },
    {
      name: 'Docks Seafood',
      slug: 'docks-seafood',
      addressLine1: '6 Rue du Bac',
      city: 'Paris',
      lat: 48.8561,
      lng: 2.325,
      cuisine: 'Poissons',
      priceRange: PriceRange.EURO_EURO_EURO
    },
    {
      name: 'Tacos 9e',
      slug: 'tacos-9e',
      addressLine1: '18 Rue du Faubourg',
      city: 'Paris',
      lat: 48.8729,
      lng: 2.345,
      cuisine: 'Mexicain',
      priceRange: PriceRange.EURO
    },
    {
      name: 'Paname Bao',
      slug: 'paname-bao',
      addressLine1: '42 Rue de Belleville',
      city: 'Paris',
      lat: 48.8729,
      lng: 2.3867,
      cuisine: 'Street food',
      priceRange: PriceRange.EURO
    },
    {
      name: 'Côté Seine',
      slug: 'cote-seine',
      addressLine1: '2 Quai Voltaire',
      city: 'Paris',
      lat: 48.8575,
      lng: 2.3329,
      cuisine: 'Français',
      priceRange: PriceRange.EURO_EURO
    },
    {
      name: 'Pasta Fresca',
      slug: 'pasta-fresca',
      addressLine1: '11 Rue de Bretagne',
      city: 'Paris',
      lat: 48.8621,
      lng: 2.3625,
      cuisine: 'Italien',
      priceRange: PriceRange.EURO_EURO
    }
  ];

  await prisma.restaurant.createMany({ data: restaurantData });

  const tagNames = ['romantique', 'ramen', 'brunch', 'business', 'végétarien', 'street'];
  const tags = await prisma.cuisineTag.createMany({
    data: tagNames.map((name) => ({ name }))
  });

  const [claire, mehdi, ines] = await prisma.user.findMany({});
  const restaurants = await prisma.restaurant.findMany({});

  await prisma.review.createMany({
    data: [
      {
        authorId: claire.id,
        restaurantId: restaurants[0].id,
        rating: 4.5,
        text: 'Cuisine généreuse, parfait pour un dîner à deux.',
        visitedAt: new Date('2024-06-12')
      },
      {
        authorId: mehdi.id,
        restaurantId: restaurants[1].id,
        rating: 4.0,
        text: 'Bouillon intense, nouilles al dente.',
        visitedAt: new Date('2024-05-20')
      },
      {
        authorId: ines.id,
        restaurantId: restaurants[4].id,
        rating: 4.5,
        text: 'Super options veggie et desserts légers.',
        visitedAt: new Date('2024-07-02')
      }
    ]
  });

  await prisma.list.create({
    data: {
      name: 'Top ramen',
      description: 'Les meilleures adresses ramen à Paris.',
      ownerId: mehdi.id,
      items: {
        create: [
          { restaurantId: restaurants[1].id, note: 'Tonkotsu crémeux.' },
          { restaurantId: restaurants[7].id, note: 'Buns moelleux.' }
        ]
      }
    }
  });

  await prisma.follow.create({ data: { followerId: claire.id, followingId: mehdi.id } });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
