import React from 'react';

const Story = ({ sceneText }) => (
  <section className="story-text">
    {sceneText.map((text, index) => <p key={index}>{text}</p>)}
  </section>
);

export default Story;