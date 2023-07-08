export const FIELDS = [
  {
    id: 'images',
    key: 'images',
    component: 'IMAGE',
    editable: false,
  },
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
    component: 'SELECT_ITEM',
    label: 'Type',
    options: ['personal', 'community'],
  },
  {
    id: 'tag',
    key: 'tag',
    component: 'SELECT_ITEM',
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
