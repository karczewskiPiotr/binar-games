class Api::V1::InvitationsController < ApiController
  def index
    @invitations = current_user.invitations.pending
  end

  def accept
    invitation = Invitation.find(params[:id])
    return render json: { errors: invitation.errors.full_messages }, status: :unprocessable_entity if invitation.nil?

    invitation.accepted!
  end

  def decline
    invitation = Invitation.find(params[:id])
    return render json: { errors: invitation.errors.full_messages }, status: :unprocessable_entity if invitation.nil?

    invitation.declined!
  end
end
