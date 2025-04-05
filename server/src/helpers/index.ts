export const generatePrompt = (
  name: string,
  job_title: string,
  company: string,
  location: string,
  summary: string
) => {
  const prompt = `Generate a personalized outreach message for:
Name: ${name}
Job Title: ${job_title}
Company: ${company}
Location: ${location}
Summary: ${summary}

The message should be professional, friendly, and mention how Outflo can help them with their outreach needs.`;

  return prompt;
};
