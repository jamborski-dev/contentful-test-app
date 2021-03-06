import React, { useState, useEffect } from 'react';
import { List, ListItem, Note } from '@contentful/forma-36-react-components';
import { SidebarExtensionSDK } from '@contentful/app-sdk';
import readingTime from 'reading-time';

interface SidebarProps {
  sdk: SidebarExtensionSDK;
}

const CONTENT_FIELD_ID = 'body';

const Sidebar = (props: SidebarProps) => {
  const { sdk } = props;
  const contentField = sdk.entry.fields[CONTENT_FIELD_ID];
  const [blogText, setBlogText] = useState(contentField.getValue());

  useEffect(() => {
    const detach = contentField.onValueChanged(value => {
      setBlogText(value);
    });
    return () => detach();
  }, [contentField]);

  const stats = readingTime(blogText || '');

  return (
    <>
      <Note>
        Metrics for your blog post:
        <List>
          <ListItem>Word count: {stats.words}</ListItem>
          <ListItem>Reading time: {stats.text}</ListItem>
        </List>
      </Note>
    </>
  );
};

export default Sidebar;
