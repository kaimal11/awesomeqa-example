import * as React from "react";
import { NextPage } from "next";
import Link from 'next/link'
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { IconButton } from "@mui/material";
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';

const Home: NextPage = () => {

  const handleClick = async () => {
    console.log("clicked");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, mt: 15, mb: 15 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                '& > div': {
                  width: '30%',
                  borderRadius: 2,
                  bgcolor: '#1C1C1F',
                  padding: 2,
                  boxSizing: 'border-box',
                  fontSize: '20px'
                },
                '& > div > a': {
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'start',
                }
              }}
            >
              <div>
                <Link href="/tickets">
                  <a>
                    <IconButton sx={{ mb: 2, bgcolor: '#302C50', borderRadius: 2 }}>
                      <LibraryBooksOutlinedIcon />
                    </IconButton>
                    Knowledge Base
                  </a>
                </Link>
              </div>
              <div>
                <Link href="/tickets">
                  <a>
                    <IconButton sx={{ mb: 2, bgcolor: '#302C50', borderRadius: 2 }}>
                      <SupportAgentOutlinedIcon />
                    </IconButton>
                    Tickets
                  </a>
                </Link>
              </div>
              <div>
                <Link href="/tickets">
                  <a>
                    <IconButton sx={{ mb: 2, bgcolor: '#302C50', borderRadius: 2 }}>
                      <LightbulbOutlinedIcon />
                    </IconButton>
                    FAQ Insights
                  </a>
                </Link>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
