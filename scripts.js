function populateExpTable() {
	// Fetch the contents of the projects.json file
	fetch("./projects.json")
		.then((response) => response.json())
		.then((jsonData) => {
			// Access the necessary data from the object to populate the experience table
			const experience = jsonData.experience;
			const experienceTable = document.getElementById("experience-table");

			// Generate the HTML markup for the table rows using the data
			const rows = Object.values(experience).map((exp) => {
				const linksHTML = Object.keys(exp.links)
					.map((key) => `<a href="${exp.links[key]}">${key}</a>`)
					.join(", "); // Join links with a comma

				const timelineHTML = Object.values(exp.timeline).join(" - ");
				return `
                    <tr>
                        <td>${exp.name} (${exp.designations.join(", ")})</td>
                        <td>${exp["short-description"]}</td>
                        <td>${exp.tech.join(", ")}</td>
                        <td>${linksHTML}</td>
                        <td>${timelineHTML}
                    </tr>
                `;
			});

			// Append the generated HTML markup to the experience table
			experienceTable.innerHTML += rows.join("");
		})
		.catch((error) => {
			console.error("Error fetching JSON:", error);
		});
}

function populatePersonalProjectsCards() {
	fetch("./projects.json")
		.then((response) => response.json())
		.then((jsonData) => {
			const projects = jsonData.projects;
			const container = document.querySelector(".projects-card-container");

			// Generate cards for each project
			Object.values(projects).forEach((project) => {
				const card = document.createElement("div");
				card.className = "project-card";

				// Create rows for title, description, tech, and repo link
				const titleRow = document.createElement("div");
				titleRow.textContent = `${project.title}`;
				titleRow.className = "project-card-title";
				card.appendChild(titleRow);

				const descriptionRow = document.createElement("div");
				descriptionRow.textContent = `${project.description}`;
				descriptionRow.className = "project-card-description";
				card.appendChild(descriptionRow);

				const techRow = document.createElement("div");
				techRow.textContent = `${project.tech.join(", ")}`;
				techRow.className = "project-card-tech";
				card.appendChild(techRow);

				const repoRow = document.createElement("div");
				const repoLink = document.createElement("a");
				repoLink.href = project.repo;
				repoLink.textContent = "Repository Link";
				repoRow.className = "project-card-link";
				repoRow.appendChild(repoLink);
				card.appendChild(repoRow);

				// Append the card to the container
				container.appendChild(card);
			});
		})
		.catch((error) => {
			console.error("Error fetching projects JSON:", error);
		});
}

// Call the function to populate the project cards
populatePersonalProjectsCards();

// Call the function to populate the table
populateExpTable();
