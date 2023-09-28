import Container from "@/components/Layout/Container";
import BreadCrumb from "@/components/Utils/BreadCrumb";
import { GoBackFromHelpAndSupport, HelpSearchBox } from "@/components/Utils/styledComponents";

const help = () => {
    return (
        <div className=" flex flex-col gap-10 sm:gap-16 md:gap-32">
            <Container>
                <BreadCrumb />
                <div className="grid grid-cols-6 mt-10">
                    {/* Left Side: Search Help */}
                    <div className="col-span-2 h-52">
                        <GoBackFromHelpAndSupport />
                        <HelpSearchBox />
                    </div>
                    {/* Right Side: Show Selected Search Details */}
                    <div className="col-span-4"></div>
                </div>
            </Container>
        </div>
    );
};

export default help;
