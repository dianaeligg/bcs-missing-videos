import React from 'react'

const footerStyle ={
    textAlign: "center",
    margin: "2em 0",
    fontSize: "10px"
}

const githubLink = {
    color: "black"
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
            <div>
                <a  style={githubLink} href="https://github.com/dianaeligg/bcs-missing-videos" target="_blank"
                    rel="noopener noreferrer">
                    <img src={require("./images/GitHub-Mark-32px.png")} alt="Github logo" />
                    <span>See the code</span>
                </a> 
            </div>
            <div>Found a bug? Have a suggestion on how this app can be improved?</div>
            <div>Send an e-mail to: 
                <a href={`mailto:${abcd}?subject=Comment about BCS Missing Videos`} target="_blank" rel="noopener noreferrer"> {abcd}</a>
            </div>
        </div>
    )
}

export default Footer;