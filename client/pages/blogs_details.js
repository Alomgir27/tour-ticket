import Container from "@/components/Layout/Container";
import BlogTags from "@/components/Utils/BlogTags";
import BlogCardsR from "@/components/Utils/BlogCardsR";
import BreadCrumb from "@/components/Utils/BreadCrumb";

const blogs = () => {
    return (
        <div className=" flex flex-col gap-10 sm:gap-16 md:gap-32">
            <Container>
                <BreadCrumb />
                
                <div className="flex gap-7">
                <div className="w-11/12 ">
                    <div className="">
                        <div className="flex flex-col gap-6">
                            <div className=" border-b-[1px] border-slate-200 pb-6">
                                    <div className="text-2xl font-bold capitalize leading-normal mt-8 mb-3">
                                    Tips and Tricks to Land Your Ideal Job
                                    </div>
                                    <div className="flex gap-3 w-fit">
                                        <BlogTags/>
                                        <p>date</p>
                                    </div>
                            </div>
                            <div className="w-full h-[400px] bg-slate-300"></div>
                        </div>
                        <div className="mt-6 flex flex-col gap-8">
                            <div className="flex flex-col gap-4 text-slate-800 text-base font-normal">
                                <p>‍From the importance of keeping things concise to why motivation matters, Recruitment Consultant Nabila Jamal Rusha shares insights from the Talent Acquisition team on what makes a great application. Read on to discover insider CV pointers, the real value of cover letters, and why first impressions are everything.</p>
                                <p>We asked Nabila Jamal Rusha, Recruitment Coordinator at GetYourGuide, to share key factors her team recommends keeping in mind throughout the job application process. From polishing resumes and creating a cover letter, to how to prepare for an interview, these are tips to help candidates shine.</p>
                                <p>This will be the first in a two-part series: look out for the next installment when Nabila will share an invaluable insider look into GetYourGuide’s recruitment process.</p>
                            </div>
                            <div className="flex flex-col gap-4 text-slate-800 text-base font-normal">
                                <h1 className="text-slate-800 text-lg font-bold">Long CVs are a No Go</h1>
                                <p>Make sure that the CV is a maximum of one to two pages. Formatting your resume is important as most recruiters have a limited amount of time for reviewing applications each day. So it is better to format a CV in a way that recruiters can quickly see your achievements and impact within the first few minutes of reading. For example, use bullet points instead of long paragraphs.</p>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="mt-24">
                        <BlogCardsR/>
                </div>
                </div>
            </Container>
            
        </div>
    );
};

export default blogs;
