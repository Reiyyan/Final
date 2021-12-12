import * as React from 'react';
import Container from '@mui/material/Container';
import * as DictionaryAPI from '../DictionaryAPI';
import { Button, TextField, Typography, Grid } from '@mui/material';
import WordCard from './WordCard';
import SearchIcon from '@mui/icons-material/Search';
export default function Wordly() {
    const [data, setData] = React.useState([]);
    const [word, setWord] = React.useState('');
    const [wordList, setWordList] = React.useState([]);

    const handleWord = (event) => {
        setWord(event.target.value);
    };

    const searchDictionary = () => {
        if (word !== '' && word !== null) {
            DictionaryAPI.getWord(word).then(e => {
                
                if (e.data[0] && e.data[0].meta) {
                    setData(e?.data ?? []);
                    setWordList([])
                }
                else {
                    setData([]);
                    setWordList(e?.data ?? [])
                    console.log("Word not found!")
                }
            });
        }
    };

    const handleEnter = (event) => {
        if (event.charCode === 13) {
            searchDictionary();
        }
    }

    return (
        <>
            <Container sx={{
                minHeight: '10vh',
                padding: '2rem',
            }}>
                <Typography variant='h3' textAlign='center' mb={3}>
                    Welcome to Wordly, Find your Defintions!
                </Typography>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                >
                    <TextField
                        id="outlined-name"
                        label="Word"
                        value={word}
                        onChange={handleWord}
                        onKeyPress={handleEnter}
                        autoComplete="off"
                        sx={{
                            marginRight: '10px'
                        }}
                    />
                    <Button variant="outlined" endIcon={<SearchIcon />} onClick={searchDictionary}>
                        Search
                    </Button>
                </Grid>
            </Container>
            <Grid
                container
                spacing={3}
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                sx={{
                }}
            >
                {data.map(wordData => {
                    return (<WordCard wordData={wordData} />)
                })}
            </Grid>

            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{
                    margin: '1rem 0'
                }}
            >
                {wordList.length > 0 ?
                    <Typography>
                        Try Searching for:
                    </Typography>
                    : ""}
                {wordList.length > 0 ?
                    wordList.map(e => {
                        return (<li>{e}</li>);
                    })
                    : ""}
            </Grid>
        </>
    );
}