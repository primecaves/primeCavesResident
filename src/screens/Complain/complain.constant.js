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
    options: ['Personal', 'Community'],
  },
  {
    id: 'tag',
    key: 'tag',
    component: 'SELECT_ITEM',
    label: 'Tag',
    options: [
      'Common Areas',
      'Electrical',
      'Housekeeping',
      'Lifts',
      'Plumbing',
      'Security',
      'Water Supply',
    ],
  },
  { id: 'urgent', key: 'urgent', component: 'SWITCH', label: 'Urgent' },
];
