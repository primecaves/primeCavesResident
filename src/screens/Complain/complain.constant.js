export const FIELDS = [
  //   {
  //     id: 'image',
  //     key: 'image',
  //     component: 'SLIDER',
  //   },
  {
    id: 'name',
    key: 'name',
    component: 'INPUT',
    label: 'Name',
  },
  {
    id: 'description',
    key: 'description',
    component: 'INPUT',
    label: 'Description',
  },
  {
    id: 'type',
    key: 'type',
    component: 'SELECT',
    label: 'Type',
    options: ['personal', 'community'],
  },
  {
    id: 'tag',
    key: 'tag',
    component: 'SELECT',
    label: 'Tag',
    options: [
      'common Areas',
      'Electrical',
      'Housekeeping',
      'Lifts',
      'Plumbing',
      'security',
      'water supply',
    ],
  },
  { id: 'urgent', key: 'urgent', component: 'SWITCH', label: 'Urgent' },
];
