class EventsController < ApplicationController
    before_action :find_event, only: [:show]
    def index
        if user_signed_in?
            @events = Event.where(:owner => current_user.id).order('created_at DESC')
        end
    end
    def create
        @event = current_user.events.build(event_params)

        @event.users << User.find_by(nick: params[:event][:users])
        
        @users = User.all.map{ |c| [c.nick] }
        
		if @event.save
			redirect_to @event
		else
			render 'new'
        end

    end
    def new
        @event = current_user.events.build
        @users = User.all.map{ |c| [c.nick] }
    end
    def edit

    end
    def show
       
    end
    def update

    end
    def destroy

    end
    private
    def event_params 
        params.require(:event).permit(:title, :description, :event_time, :event_date, :private).merge(owner_id: current_user.id)
    end
    def find_event
        @event = Event.find(params[:id])
    end
end
