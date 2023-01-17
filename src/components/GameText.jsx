import { FormattedMessage } from 'react-intl';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';

// Selectors
import {
    selectGameZoom,
    selectGameWidth,
    selectGameHeight,
    selectGameCanvasElement,
} from '../zustand/selectors/selectGameData';

// Hooks
import useRect from '../hooks/useRect';

// Store
import { useStore } from '../zustand/store';

const useStyles = makeStyles((theme) => ({
    textWrapper: ({ zoom, top, position, domRect }) => ({
        top: `${(domRect?.top || 0) + (top * zoom)}px`,
        userSelect: 'none',
        userDrag: 'none',
        position: 'absolute',
        textAlign: position,
        width: `calc(100% - ${((domRect?.left || 0) * 2) + (10 * zoom)}px)`,
        transform: 'translate(-50%, 0%)',
    }),
    textPositionWrapper: ({ position }) => {
        if (position === 'center') {
            return {
                left: '50%',
            };
        }

        return {};
    },
    text: ({ zoom, color, size }) => ({
        fontFamily: '"Press Start 2P"',
        fontSize: `${size * zoom}px`,
        textTransform: 'uppercase',
        margin: 0,
        color,
    }),
}));

const GameText = ({
    translationKey,
    variables = {},
    config = {},
    component: Component = 'p',
}) => {
    // Game
    const gameWidth = useStore(selectGameWidth);
    const gameHeight = useStore(selectGameHeight);
    const gameZoom = useStore(selectGameZoom);
    const canvas = useStore(selectGameCanvasElement);
    const domRect = useRect(canvas);

    const {
        color = '#FFFFFF',
        position = 'center',
        top = 0,
        size = 10,
    } = config;

    const classes = useStyles({
        height: gameHeight,
        width: gameWidth,
        zoom: gameZoom,
        position,
        domRect,
        color,
        size,
        top,
    });

    return (
        <div className={classNames(classes.textWrapper, classes.textPositionWrapper)}>
            <Component className={classes.text}>
                <FormattedMessage
                    id={translationKey}
                    values={variables}
                />
            </Component>
        </div>
    );
};

export default GameText;
