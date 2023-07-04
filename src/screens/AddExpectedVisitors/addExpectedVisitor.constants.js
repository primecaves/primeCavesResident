export const FIELDS = [
    {
        id: 'name',
        key: 'name',
        component: 'INPUT',
        label: 'Name',
        placeholder: 'Enter visitor name',
    },
    {
        id: 'phone_number',
        key: 'phone_number',
        component: 'INPUT',
        label: 'Phone Number',
        placeholder: 'Enter phone number',
    },
    {
        id: 'expected_date',
        key: 'expected_date',
        component: 'DATE_PICKER',
        label: 'Expected Date',
    },
    {
        id: 'visitor_type',
        key: 'visitor_type',
        component: 'SELECT_ITEM',
        label: 'Type',
        options: ['Guest', 'Delivery', 'Others'],
    },
    {
        id: 'description',
        key: 'description',
        component: 'INPUT',
        label: 'Description',
        placeholder: 'Enter description (optional)',
    },
];

