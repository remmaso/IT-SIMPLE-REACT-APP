import React, {Component} from 'react'

class Footer extends Component {

    render() {
        return (
            <div className={"footer"}>
                <div className={"container"}>
                    <div className={"first"}>
                        <div className={"row"}>
                            <div className={"col-3 logo"}>
                                ITSimple-Test
                            </div>
                            <div className={"col-3"}>
                                <div className={"section"}>Company</div>
                                <div className={"position active"}>About Us</div>
                                <div className={"position active"}>Careers</div>
                                <div className={"position active"}>Pricing</div>
                                <div className={"position active"}>Meet us</div>
                            </div>
                            <div className={"col-3"}>
                                <div className={"section"}>Knowledge</div>
                                <div className={"position active"}>Blog</div>
                                <div className={"position active"}>Help Center</div>
                                <div className={"position active"}>Privacy Policy</div>
                                <div className={"position active"}>Terms and conditions</div>
                            </div>
                            <div className={"col-3"}>
                                <div className={"section"}>Account</div>
                                <div className={"position active"}>Sign in</div>
                                <div className={"position active"}>Sign up</div>
                                <div className={"position active"}>F.A.Q.</div>
                            </div>
                        </div>
                    </div>
                    <div className={"row second"}>
                        <div className={"col"}>
                            ITSimple-Test 2020. All rights reserved
                        </div>
                        <div className={"col-auto"}>
                            <i className="fa fa-facebook active" aria-hidden="true"/>
                            <i className="fa fa-twitter active" aria-hidden="true"/>
                            <i className="fa fa-instagram active" aria-hidden="true"/>
                            <i className="fa fa-linkedin active" aria-hidden="true"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer
