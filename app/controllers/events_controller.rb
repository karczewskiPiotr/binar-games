class EventsController < ApplicationController
    before_action :authenticate_user!, :find_event, only: [:show]
    def index
       
        @events = current_user.events.order('created_at DESC')

    end
    def create
        @event = current_user.events.build(event_params)
		if @event.save
			redirect_to @event
		else
			render 'new'
		end
    end
    def new
        @event = current_user.events.build
        @game=Game.pluck(:title)
    end
   
    private
    def event_params 
        params.require(:event).permit(:title, :description, :event_time, :event_date).merge(game_id: Game.find_by(title: params[:event][:game]).id)
    end
    def find_event
        @event = Event.find(params[:id])
    end
end
