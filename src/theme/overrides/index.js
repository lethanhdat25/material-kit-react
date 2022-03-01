import { merge } from 'lodash';
import autocomplete from './Autocomplete';
import backdrop from './Backdrop';
import button from './Button';
import card from './Card';
import iconButton from './IconButton';
import input from './Input';
import lists from './Lists';
import paper from './Paper';
import tooltip from './Tooltip';
import typography from './Typography';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
    return merge(
        card(theme),
        lists(theme),
        paper(theme),
        input(theme),
        button(theme),
        tooltip(theme),
        backdrop(theme),
        typography(theme),
        iconButton(theme),
        autocomplete(theme)
    );
}
