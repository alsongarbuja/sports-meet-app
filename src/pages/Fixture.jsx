import React, { useState, useEffect } from 'react'
import FixtureCard from '../components/FixtureCard'
import Layout from '../layout/Layout'
import Box from '@mui/material/Box';

import Loader from '../components/Loader'
import jsendDestructor from '../utils/api/jsendDestructor'

function Fixture() {

    const jsendRes = new jsendDestructor()
    const [ matches, setMatches ] = useState([])
    const [ loading, setLoading ] = useState(false)

    const getFixtures = async () => {
        setLoading(true)
        const { data, status, message } = await jsendRes.destructFromApi('/fixtures', 'GET')

        if(status === 'success'){
            setMatches(data);
        }else{
            console.log(data, message);
        }
        setLoading(false)
    }

    useEffect(() => {
        getFixtures();
    // eslint-disable-next-line
    }, [])
    return (
        <Layout title="Fixture">
            {loading&&<Loader />}
            <Box mx={{xs:'1rem', sm:'3rem', md:'5rem', lg:'9rem'}} my='1rem'>
                {
                    matches?.map((match, i) => match[0]?.sport&&<FixtureCard key={i} gameName={match[0]?.sport.name} matches={match} />)
                }
            </Box>
        </Layout>
    )
}

export default Fixture
