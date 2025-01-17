import fileTextFill from '@iconify/icons-eva/file-text-fill';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
    {
        title: 'dashboard',
        path: '/dashboard/app',
        icon: getIcon(pieChart2Fill)
    },
    {
        title: 'product',
        path: '/dashboard/products',
        icon: getIcon(shoppingBagFill)
    },
    {
        title: 'blog',
        path: '/dashboard/blog',
        icon: getIcon(fileTextFill)
    }
];

export default sidebarConfig;
