export const DEFAULT_OFFER = createJobOffer("placeholder");

export function createJobOffer(id) {
    return {
        "id": id,
        "jobAvatar":"",
        "jobTitle": "",
        "jobCategory": "",
        "jobExperience": "",
        "postingDate": "",
        "companyName": "IT Simple",
        "companySize": "",
        "jobLocation": null,
        "remotePercentage": "",
        "jobImage":"",
        "jobDescription": "",
        "salary": [{
            "type": "",
            "from": "",
            "to": "",
            "currency": "",
            "per": ""
        }],
        "techStack": [],
        "workMethodology": [],
        "dailyTasks": [],
        "jobSpecs": [],
        "equipment": [],
        "additionalEquipment": [],
        "benefits": [],
        "officeAmenities": []
    };
}
