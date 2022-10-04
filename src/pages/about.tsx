import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import HelpItem0 from '../components/helpItems/HelpItem0';
import HelpItem1 from '../components/helpItems/HelpItem1';
import HelpItem2 from '../components/helpItems/HelpItem2';
import HelpItem3 from '../components/helpItems/HelpItem3';
import HelpItem4 from '../components/helpItems/HelpItem4';
import HelpItem5 from '../components/helpItems/HelpItem5';
import HelpItem6 from '../components/helpItems/HelpItem6';
import HelpItem7 from '../components/helpItems/HelpItem7';
import HelpItem8 from '../components/helpItems/HelpItem8';

import DataAndMethodsContext from '../context/dataAndMethods/dataAndMethodsContext';

import { websiteName } from '../api/apiConstants';

const About = () => {
  const dataAndMethodsContext: any = useContext(DataAndMethodsContext);

  const { setMyStates }: any = dataAndMethodsContext;

  const onLineWizard = () => {
    let myNewStateChoices = JSON.parse(
      JSON.stringify(dataAndMethodsContext.myStates)
    );
    myNewStateChoices.helpDialogActive = true;
    myNewStateChoices.helpDialogOpen = true;
    window.localStorage.setItem(
      'iWantToDine.myStates',
      JSON.stringify(myNewStateChoices)
    );
    setMyStates(myNewStateChoices);
  };

  return (
    <>
      <h2>How to use</h2>
      <Link className='p' onClick={() => onLineWizard()} download>
        Step by Step Help
      </Link>
      <h2>
        JimmySoft LLC{' '}
        <IconButton
          aria-label=''
          href='https://jimmysoftllc.com'
          rel='noopener noreferrer'
          target='_blank'
          color={'primary'}
        >
          <i className='fas fa-external-link-alt'></i>
        </IconButton>
      </h2>
      <p className='p'>
        This program was created by JimmySoft LLC. JimmySoft LLC specialises in
        DIY, scientific and customer apps.
      </p>
      <h2>Why use {websiteName}?</h2>
      <p className='p'>
        {websiteName} is an electronic version of a paper gym notebook. You can
        record and track your progress. You can share your progress with your
        gym buddies to keep your motivated.
      </p>
      <p className='p'>
        The inspiration for {websiteName}.com. A website that only contains
        information that is important to you and your success. There is no fluff
        in the app just the info you need.
      </p>
      <h2>User manual</h2>
      <p className='p'>
        Download our user manual to learn how to add your account, exercises,
        gym days and buddy list.
      </p>
      <Link
        className='p'
        href='https://iwanttodine.com/manuals/user-manual.pdf'
        target='_blank'
        rel='noopener noreferrer'
        download
      >
        <i className='fas fa-file-download'></i> Download User Manual
      </Link>
    </>
  );
};

export default About;
