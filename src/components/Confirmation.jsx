import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

export default function Confirmation() {
  const [feedback, setFeedback] = useState({ q1: 0, q2: 0, q3: 0, comments: '' });

  const handleSubmit = e => {
    e.preventDefault();
    // 这里可以把 feedback 发送到后端／日志
    alert('Thank you for your feedback!');
    // 然后你可 redirect 回首页
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h2 className="text-2xl">Thank you for your purchase!</h2>
      <p>We will send you a confirmation email shortly.</p>
      <p>Please let us know how we did by filling out the following survey:</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['Overall experience','Ease of purchase','Product satisfaction'].map((q, idx) => (
          <div key={idx}>
            <label>{q}</label>
            <div>
              {[1,2,3,4,5].map(n => (
                <span
                  key={n}
                  onClick={() => setFeedback(f => ({ ...f, ['q'+(idx+1)]: n }))}
                  style={{ cursor:'pointer', color: feedback['q'+(idx+1)]>=n ? '#f6ad55' : '#cbd5e0' }}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        ))}
        <div>
          <label>Additional Comments:</label>
          <br />
          <textarea
            rows={4}
            className="w-full border rounded px-3 py-2"
            value={feedback.comments}
            onChange={e => setFeedback(f => ({ ...f, comments: e.target.value }))}
          />
        </div>
        <Button variant="primary" className="w-100 mt-3" type="submit">
          Submit Feedback
        </Button>
      </form>
    </div>
  );
}
