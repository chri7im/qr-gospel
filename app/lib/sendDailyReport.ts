import { transporter } from './email';
import { generateDailyReport } from './analytics';

const generateCsvContent = (report: any): string => {
  let csv = 'Date,Total Visitors\n';
  csv += `${report.date},${report.totalVisitors}\n\n`;
  csv += 'Language Selections\n';
  csv += 'Language,Count\n';
  report.languageSelections.forEach((lang: any) => {
    csv += `${lang.language},${lang.count}\n`;
  });
  csv += '\nChosen Concerns\n';
  csv += 'Concern,Count\n';
  report.concerns.forEach((concern: any) => {
    csv += `${concern.concern},${concern.count}\n`;
  });
  csv += '\nUser-Entered Concerns (Other)\n';
  csv += 'Description\n';
  report.otherConcerns.forEach((desc: string) => {
    csv += `"${desc.replace(/"/g, '""')}"\n`;
  });
  csv += '\nContact Submissions\n';
  csv += 'Email,Message,Language,Concern,Phone,Visitor ID\n';
  report.contactSubmissions.forEach((submission: any) => {
    csv += `"${submission.email.replace(/"/g, '""')}","${submission.message.replace(/"/g, '""')}","${submission.language}","${submission.concern}","${submission.phone || ''}","${submission.visitor_id}"\n`;
  });
  return csv;
};

export const sendDailyReport = async () => {
  try {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const report = await generateDailyReport(yesterday);
    const csvContent = generateCsvContent(report);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Daily Report for ${yesterday}`,
      text: `Attached is the daily report for ${yesterday}, including visitor statistics and contact submissions.`,
      attachments: [
        {
          filename: `report-${yesterday}.csv`,
          content: csvContent,
          contentType: 'text/csv',
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Daily report email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending daily report email:', error);
    throw error;
  }
};