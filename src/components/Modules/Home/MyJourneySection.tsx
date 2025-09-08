import React from "react";

type Props = {};

const MyJourneySection: React.FC<Props> = () => {
  return (
    <div className="px-6 py-12 rounded-xl bg-card/50 backdrop-blur-lg shadow-lg border border-border">
      <h1 className="text-foreground text-4xl md:text-5xl font-bold underline underline-offset-8 decoration-primary mb-6">
        My Journey
      </h1>
      <article className="text-muted-foreground leading-relaxed text-lg space-y-4">
        <p>
          I am a writer. It's more than a hobby; it's how I understand my
          feelings. I've always believed that to become a writer, you must first
          be a reader. But I realized that modern life moves so quickly that
          many people don't find the time to read books, short stories, or
          especially novels and poetry. So much time is spent on the internet,
          often without gaining anything meaningful.
        </p>
        <p>
          This inspired me to create a platform where anyone can read books
          online and expand their knowledge in a way that suits them. If you're
          someone who prefers digital to paper, you've come to the right place.
          Welcome—your next great read is waiting for you here.
        </p>
      </article>
    </div>
  );
};

export default MyJourneySection;
