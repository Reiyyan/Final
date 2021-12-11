import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    capiatlizeText: {
        '&::first-letter': {
            textTransform: 'uppercase',
        }
    },
});



export default function WordCard(props) {
    const classes = useStyles(props);
    const data = props.wordData ?? null;

    let audioElement;

    if (data) {
        audioElement = new Audio((data?.hwi?.prs?.[0]?.sound?.audio ? `https://media.merriam-webster.com/audio/prons/en/us/mp3/${data?.hwi?.prs?.[0]?.sound?.audio?.[0]}/${data?.hwi?.prs?.[0]?.sound?.audio}.mp3` : null))

    }

    const playAudio = () => {
        audioElement.play();
    };

    let cardHeader = <CardHeader
        title={data?.hwi?.hw ?? 'Missing Alt Text'}
        subheader={data?.hwi?.prs?.[0]?.mw ?? "Missing Pronounciation"}
        sx={{
            textTransform: 'capitalize'
        }}
    />;

    if (data?.hwi?.prs?.[0]?.sound?.audio) {
        cardHeader = <CardHeader
            title={data?.hwi?.hw ?? 'Missing Alt Text'}
            subheader={data?.hwi?.prs?.[0]?.mw ?? ""}
            sx={{
                textTransform: 'capitalize'
            }}

            action={
                <IconButton aria-label="settings">
                    <VolumeUpIcon onClick={playAudio} />
                </IconButton>
            }
        />
    }

    return (
        <Card sx={{ minWidth: 345, maxWidth: 345, margin: '1rem' }}>
            {cardHeader}
            <CardMedia
                component="img"
                image={data?.art?.artid ? `https://merriam-webster.com/assets/mw/static/art/dict/${data.art.artid}.gif` : '/static/images/missing.png'}
                alt={data?.hwi?.hw ?? 'Missing Alt Text'}
            />
            <CardContent>
                <Typography variant="body1" color="text.secondary" className={classes.capiatlizeText}>
                    {data?.fl}
                </Typography>
                <ol variant="body2" color="text.secondary">
                    {data?.shortdef.map(def => {
                        return (
                            <li >
                                <Typography variant="body2" color="text.secondary" className={classes.capiatlizeText}>
                                    {def}.
                                </Typography>
                            </li>
                        )
                    })}
                </ol>
            </CardContent>
        </Card>
    );
}
