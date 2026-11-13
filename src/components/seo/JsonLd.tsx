import { selectedWork } from "@/data/selected-work";
import { absoluteUrl, siteConfig } from "@/data/portfolio";

export function JsonLd() {
  const personId = absoluteUrl("/#person");
  const websiteId = absoluteUrl("/#website");
  const profilePageId = absoluteUrl("/#profile-page");

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: siteConfig.name,
        url: absoluteUrl("/"),
        image: {
          "@type": "ImageObject",
          url: absoluteUrl(siteConfig.profileImage),
        },
        jobTitle: ["Full-Stack Developer", "AI/ML Engineer"],
        description: siteConfig.description,
        email: `mailto:${siteConfig.email}`,
        homeLocation: {
          "@type": "Place",
          name: siteConfig.location,
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "University of Central Punjab",
          url: "https://ucp.edu.pk/",
        },
        sameAs: [siteConfig.github, siteConfig.linkedin],
        knowsAbout: [
          "Full-stack web development",
          "Artificial intelligence",
          "Machine learning",
          "Natural language processing",
          "React",
          "Next.js",
          "Node.js",
          "Django",
          "PyTorch",
          "Hugging Face Transformers",
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: absoluteUrl("/"),
        name: `${siteConfig.name} Portfolio`,
        description: siteConfig.description,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": profilePageId,
        url: absoluteUrl("/"),
        name: siteConfig.title,
        description: siteConfig.description,
        inLanguage: "en",
        dateModified: siteConfig.lastModified,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl(siteConfig.profileImage),
        },
      },
      {
        "@type": "ItemList",
        "@id": absoluteUrl("/#selected-work"),
        name: "Selected software projects",
        numberOfItems: selectedWork.length,
        itemListElement: selectedWork.map((work, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "SoftwareSourceCode",
            name: work.name,
            description: work.description,
            url: absoluteUrl(`/#chapter-${work.id}`),
            image: absoluteUrl(work.image),
            codeRepository: work.github,
            keywords: work.stack,
            author: { "@id": personId },
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
