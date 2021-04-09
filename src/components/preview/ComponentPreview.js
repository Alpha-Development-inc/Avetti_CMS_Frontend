import React from 'react';
import { Box } from '@material-ui/core';
import DOMPurify from 'dompurify';


//-----------------------WRITTEN BY SAVVY-----------------------------------------------------
const ComponentPreview = (props) => {

    const createMarkup = (html) => {
        return  {
          __html: DOMPurify.sanitize(html)
        }
      }

  return (
    <Box margin="5px" width="45%">
        {props.component.type === 'image' &&
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <img alt="content" src={props.component.content}/>
            </Box>
        }
        {props.component.type === 'text' &&
            <Box>
                <div className="text-content" dangerouslySetInnerHTML={createMarkup(props.component.content)}></div>
            </Box>
        }
    </Box>
  );
};

export default ComponentPreview;