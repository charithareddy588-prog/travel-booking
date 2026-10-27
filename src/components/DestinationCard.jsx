
import { MapPin, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function DestinationCard({ destination }) {
  return (
    <Link
      to={`/destinations?destination=${encodeURIComponent(destination.name)}`}
      className="destination-card"
    >
      <div className="destination-image">
        <img src={destination.image} alt={destination.name} loading="lazy" />
        <span className="image-count">
          {destination.packages} {destination.packages === 1 ? "package" : "packages"}
        </span>
      </div>

      <div className="destination-content">
        <div>
          <h3>{destination.name}</h3>
          <p className="muted location-line">
            <MapPin size={15} /> {destination.country}
          </p>
        </div>
        <span className="round-arrow"><ArrowUpRight size={19} /></span>
      </div>
    </Link>
  );
}
