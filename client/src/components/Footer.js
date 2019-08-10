import React from 'react'

const footerStyle ={
    textAlign: "center",
    margin: "2em 0",
    fontSize: "10px"
}

const Footer = () => {
    //totally legit obfuscation method
    let abcd = "diana";
    abcd = abcd.concat(".eli");
    abcd = abcd + ".gg";
    abcd = abcd.concat("@gm");
    abcd = abcd.concat("ail");
    abcd = abcd + ".com";
    return(
        <div style={footerStyle}>
        <div>Found a bug? Have a suggestion on how this app can be improved?</div>
        <div>Send an e-mail to: 
            <a href={`mailto: ${abcd}`}> {abcd}</a>
        </div>
        </div>
    )
}

export default Footer;