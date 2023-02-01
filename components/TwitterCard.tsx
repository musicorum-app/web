import { Box, Flex } from "@chakra-ui/react"
import Image, { StaticImageData } from "next/image"

interface TwitterCardProps {
    username?: string,
    imageSrc?: string,
    userHandle?: string,
    bodyText?: React.ReactNode,
    userImage: StaticImageData,
    bodyImage: StaticImageData
}

const dateFormatterOptions = {
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
} as const



const TwitterCard = (props: TwitterCardProps) => {
    return (
        <Box borderRadius={".8rem"} p={3} bg={"#15202B"} border={"2px solid #313b45"}>
            <Flex direction={"column"}>

                <Flex width={"100%"} direction={"row"} justify={"start"} mb={"1rem"}>
                    <Image alt="user image" src={props.userImage} width={48} height={48} style={{ borderRadius: "100%" }} />
                    <Flex direction={"column"} ml={3}>
                        <span>{props.username}</span>
                        <span style={{ color: "#8899a6" }}>{props.userHandle}</span>
                    </Flex>
                </Flex>

                🎵 This was my week on music ✨

                <Image src={props.bodyImage} alt="musicorum gen img" style={{ marginTop: '1rem', borderRadius: "0.375rem" }} />
                <span style={{ marginTop: '1rem', color: '#8899A6' }}>{
                    new Intl.DateTimeFormat('en-us', dateFormatterOptions).format(new Date(1668386921689))
                }</span>

            </Flex>
        </Box>
    )
}

export default TwitterCard
