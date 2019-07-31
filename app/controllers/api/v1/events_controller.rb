class Api::V1::EventsController < ApiController
  def index
    @events = Event.all
  end

  def event_user
    @event = Event.find(params[:id])
  end
end
