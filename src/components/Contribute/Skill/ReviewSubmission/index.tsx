// src/components/Contribute/Skill/ReviewSubmission/ReviewSubmission.tsx
import { SkillFormData } from '@/types';
import { Content, ContentVariants } from '@patternfly/react-core';
import React from 'react';
import './submission.css';
import { Accordion, AccordionContent, AccordionItem, AccordionToggle, Button, FormFieldGroupHeader } from '@patternfly/react-core';

interface ReviewSubmissionProps {
  skillFormData: SkillFormData;
  isGithubMode: boolean;
}

export const ReviewSubmission: React.FC<ReviewSubmissionProps> = ({ skillFormData, isGithubMode }) => {
  const [expanded, setExpanded] = React.useState<{ [key: string]: boolean }>({});

  const onToggle = (id: number) => {
    setExpanded((prevState) => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  return (
    <>
      <section className="review-submission-container">
        <Content component={ContentVariants.h3}>Review</Content>
        <p>Review the information below and click finish to submit your knowledge contribution. Use the back button to make changes.</p>
        {/* Author Information */}
        <article>
          <div className="info-wrapper">
            <p className="submission-titles">Contributor Information</p>
            <p className="submission-subtitles">Information required for a Github Developer Certificate of Origin (OC) sign-off.</p>

            <div className="contributors-wrapper">
              <h5 className="category-titles">Contributors</h5>
              <p>{skillFormData.name}</p>
              <p>{skillFormData.email}</p>
            </div>
          </div>
        </article>

        {/* Knowledge Information */}
        <article>
          <div className="info-wrapper">
            <p className="submission-titles">Knowledge Information</p>
            <p className="submission-subtitles">Brief information about the Knowledge and the directory path for the QnA and Attribution files.</p>
          </div>

          <h5 className="category-titles">Submission summary</h5>
          <p>{skillFormData.submissionSummary}</p>

          <h5 className="category-titles">Directory path</h5>
          <p>{skillFormData.filePath}</p>
        </article>

        {/* Seed Examples */}
        <article>
          <div className="info-wrapper">
            <p>Seed data</p>
            <p className="submission-subtitles">Data that will be used to start teaching your model.</p>
          </div>

          {skillFormData.seedExamples.map((seedExample, index) => (
            <Accordion asDefinitionList={false} className="accordion-wrapper">
              <AccordionItem isExpanded={!!expanded[index]} key={index}>
                <AccordionToggle onClick={() => onToggle(index)} id={`seed-example-toggle-${index}`}>
                  Sample {index + 1}
                </AccordionToggle>
                <AccordionContent id={`seed-example-content-${index}`} className='accordion-content'>
                  <p>
                    <h5 className="category-titles">Context:</h5> {seedExample.context}
                  </p>
                  <p>
                    <h5 className="category-titles">Question {index + 1}:</h5> {seedExample.question}
                  </p>
                  <p>
                    <h5 className="category-titles">Answer {index + 1}:</h5> {seedExample.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </article>

        <article className="info-wrapper">
          {/* Attribution Information */}
          {isGithubMode && (
            <div>
              <p>
                <strong>Attribution Information</strong>
              </p>
              <p>
                <i>Title of Work:</i> {skillFormData.titleWork}
              </p>
              <p>
                <i>License of Work:</i> {skillFormData.licenseWork}
              </p>
              <p>
                <i>Creators:</i> {skillFormData.creators}
              </p>
            </div>
          )}
        </article>
      </section>
    </>
  );
};

export default ReviewSubmission;
