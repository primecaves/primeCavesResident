const API_1 = {
  status: 200,

  key_to_remove: [
    '_id',
    'createdAt',
    'updatedAt',
    'brand',
    '__v',
    'image',
    'id',
    'no_of_days',
    'no_of_quantity',
    'description',
    'maximum_days_booking',
  ],
  display_name_key: 'name',
  data: [
    {
      name: 'Badminton',
      category: 'outdoor',
      quantity: 6,
      price: 800,
      brand: 'Cosco',
      description: 'this is badminton',
      no_of_days: 1,
      no_of_quantity: 1,
      maximum_days_booking: 60,
      image: [
        'https://images.unsplash.com/photo-1501601983405-7c7cabaa1581?fit=crop&w=240&q=80',
        // 'https://images.unsplash.com/photo-1543747579-795b9c2c3ada?fit=crop&w=240&q=80',
        // 'https://images.unsplash.com/photo-1551798507-629020c81463?fit=crop&w=240&q=80',
        // 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?fit=crop&w=240&q=80',
        // 'https://images.unsplash.com/photo-1503642551022-c011aafb3c88?fit=crop&w=240&q=80',
        // 'https://images.unsplash.com/photo-1482686115713-0fbcaced6e28?fit=crop&w=240&q=80',
      ],

      createdAt: '2023-04-05T18:06:17.392Z',
      updatedAt: '2023-04-05T18:06:17.392Z',
    },
    {
      name: 'Table Tennis',
      category: 'indoor',
      quantity: 5,
      price: 800,
      brand: 'victor',
      no_of_days: 1,
      no_of_quantity: 1,
      maximum_days_booking: 60,
      image: [
        'https://images.unsplash.com/photo-1543747579-795b9c2c3ada?fit=crop&w=240&q=80',
        // 'https://images.unsplash.com/photo-1551798507-629020c81463?fit=crop&w=240&q=80',
        // 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?fit=crop&w=240&q=80',
        // 'https://images.unsplash.com/photo-1503642551022-c011aafb3c88?fit=crop&w=240&q=80',
        // 'https://images.unsplash.com/photo-1482686115713-0fbcaced6e28?fit=crop&w=240&q=80',
        // 'https://images.unsplash.com/photo-1501601983405-7c7cabaa1581?fit=crop&w=240&q=80',
      ],
      createdAt: '2023-04-05T18:06:17.392Z',
      updatedAt: '2023-04-05T18:06:17.392Z',
    },
  ],
};

export default API_1;
