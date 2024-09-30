from marshmallow import Schema, fields

class TranscriptSchema(Schema):
    """Schema class for Transcript model serialization and deserialization"""
    
    id = fields.Int(dump_only=True)
    episode_id = fields.Int(required=True)
    content = fields.Str(required=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)

    # TODO: Implement field-level validation for the TranscriptSchema
    # TODO: Add any custom serialization or deserialization methods if needed
    # TODO: Ensure that the TranscriptSchema aligns with the Transcript model in the database