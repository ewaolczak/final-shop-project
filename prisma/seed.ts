import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getProducts() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      name: 'Elephant Mexico Maragogype Coffee',
      price: 30,
      amount: 10,
      description:
        'Nestled in the mountain ranges of the Sierra Madre, this estate is situated in one of the most celebrated coffee growing regions of Mexico. The breathtaking jungle landscapes, waterfalls, cave systems, and torrential rivers provide ideal conditions to grow this unique varietal. Boasting huge beans, Maragogype plants may yield fewer beans, but they produce soft, light, floral aromas with delicate notes of sweet lemon, green grapes, milk chocolate and honey. An exquisite cup.',
    },
    {
      id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
      name: 'Brasil Arabica Santos Coffee',
      price: 28,
      amount: 12,
      description:
        'Coffee Brasil Santos with its aroma reminds of mature hazelnuts. The flavor is also characterized by sweet, honey-like tones of low acidity that gradually flow into a distinctive but delicious chocolate flavor. This Brazilian 100% Arabica at its end will delight with a pleasant sweet, long lasting bitterness.',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17258',
      name: 'Jamaica Blue Mountain Coffee',
      price: 45,
      amount: 8,
      description:
        'Blue Mountain coffee has a sweet, rich flavor without the bitterness found in some other coffee blends. This popular Jamaican coffee is smooth and clean and, once you taste it, you’ll immediately understand why it is renowned for excellence. While sipping on your Jamaica Blue Mountain coffee, preferably from the comfort of a luxurious all-inclusive resort suite, you’ll be able to enjoy its rich aroma with hints of sweet herbs, florals, and nutty overtones.',
    },
    {
      id: '4e268521-7322-460c-a1f1-861090c52590',
      name: 'Nepal Mount Everest Coffee',
      price: 17,
      amount: 5,
      description:
        'The taste of Nepal Mount Everest coffee has been compared to Jamaican Blue Mountain coffee. Now, that is one big compliment indeed - Himalayan coffee has big boots to fill. Once roasted, it has a fruity taste with only mild levels of acidity. It is complex and earthy, with chocolate and caramel notes. With its full, velvety body and clean and smooth aftertaste, this Himalayan coffee is a treat to drink.',
    },
  ];
}

function getImages() {
  return [
    {
      id: '28b1a2de-a1d9-41e8-955e-8df8d568f790',
      url: 'https://pozegnanie.com/media/catalog/product/cache/f62ccbd48af6c74c17ffcf27f2c988c0/m/i/mili_herbawa_img_8489_maragogype_jasne.jpg',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
    },
    {
      id: '3aaa0b42-b02f-446f-b9b4-39f5517d0d2d',
      url: 'https://pozegnanie.com/media/catalog/product/cache/f62ccbd48af6c74c17ffcf27f2c988c0/m/i/mili_herbawa_img_8406_arabica_santos_bk.jpg',
      productId: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
    },
    {
      id: '40ed95c1-1e5d-4ced-986d-b0d83b4398ef',
      url: 'https://pozegnanie.com/media/catalog/product/cache/f62ccbd48af6c74c17ffcf27f2c988c0/m/i/mili_herbawa_img_8449_jamajka.jpg',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17258',
    },
    {
      id: '6b036ca4-5e8f-455a-8dab-0e06d0d08b21',
      url: 'https://pozegnanie.com/media/catalog/product/cache/f62ccbd48af6c74c17ffcf27f2c988c0/m/i/mili_herbawa_img_8499_nepal.jpg',
      productId: '4e268521-7322-460c-a1f1-861090c52590',
    },
  ];
}

async function seed() {
  await Promise.all(
    getProducts().map((product) => {
      return db.product.create({ data: product });
    })
  );

  await Promise.all(
    getImages().map(({ productId, ...imageData }) => {
      return db.image.create({
        data: {
          ...imageData,
          product: { connect: { id: productId } },
        },
      });
    })
  );
}

seed();
