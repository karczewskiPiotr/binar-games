json.data do
  json.array! @invitations do |invitation|
    json.extract! invitation, :id, :status
    json.event do
      json.partial! 'api/v1/events/event', event: invitation.event
    end
  end
end
