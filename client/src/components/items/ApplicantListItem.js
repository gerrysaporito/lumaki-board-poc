import React from 'react';
import { Link } from 'react-router-dom';

import { Routes } from '../../common/Routes';
import { Content } from '../../common/Content';
import Card from '../Card'
import './css/ApplicantListItem.css';

const ApplicantListItem = ({user, profile}) => {
    const {first_name, last_name} = user;
    const {school, program, graduation_date, experiences, skills} = profile;
    return(
        <Card type='bump'>
            <div className='applicant-list-item'>
                <div className='overview'>
                    <p className='header'>{first_name} {last_name}</p>
                    <section>
                        <div>
                            <p><span><strong>Academic Background</strong></span></p>
                            <p><strong>Program of Study: {program || Content.notFound}</strong></p>
                            <p><strong>School: {school || Content.notFound}</strong></p>
                            <p><strong>Graduation Year: {new Date(graduation_date).getFullYear() || Content.notFound}</strong></p>
                        </div>
                        <div>
                            <p><span><strong>Most Recent Work Experience</strong></span></p>
                            <p>{experiences.length > 0 ?
                            `${experiences[0].position} at ${experiences[0].company}`  : Content.notFound}</p>
                        </div>
                    </section>
                    <div>
                        <p><span><strong>Skills:</strong></span></p>
                        <p>{skills.map(skill => skill.skill).join(", ")}</p>
                    </div>
                </div>
                <div className='next'>
                    <Link to={Routes.profileOverview.url} ><i className="fas fa-chevron-right" /></Link>
                </div>
            </div>
        </Card>
    )
};

export default ApplicantListItem;
