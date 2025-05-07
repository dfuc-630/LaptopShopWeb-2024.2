import { Card } from 'react-bootstrap';

const RecommendationCard = ({ recommendation }) => {
  return (
    <Card className="h-100 text-center border-0 shadow-sm">
      <Card.Body className="d-flex flex-column align-items-center">
        <div
          className="rounded-circle bg-primary bg-opacity-10 p-3 mb-4 text-primary"
          style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <i className={`${recommendation.iconClass} fs-2`}></i>
        </div>
        <Card.Title className="fw-bold mb-3">{recommendation.title}</Card.Title>
        <Card.Text>{recommendation.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default RecommendationCard;